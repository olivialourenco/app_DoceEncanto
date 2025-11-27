import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserId } from '../hooks/useUserId';
import { WishlistItem, STORAGE_KEYS } from '../types';
import * as wishlistService from '../services/wishlistService';

interface WishlistContextType {
  items: WishlistItem[];
  isLoading: boolean;
  totalItems: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [userId, userIdLoading] = useUserId();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalItems = items.length;

  // Backup wishlist to AsyncStorage
  const backupWishlist = useCallback(async (wishlistItems: WishlistItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST_BACKUP, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error backing up wishlist:', error);
    }
  }, []);

  // Load wishlist from Supabase
  const loadWishlist = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const wishlistItems = await wishlistService.getWishlistItems(userId);
      setItems(wishlistItems);
      backupWishlist(wishlistItems);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      // Try to load from backup
      try {
        const backup = await AsyncStorage.getItem(STORAGE_KEYS.WISHLIST_BACKUP);
        if (backup) {
          setItems(JSON.parse(backup));
        }
      } catch (backupError) {
        console.error('Error loading wishlist backup:', backupError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, backupWishlist]);

  // Load wishlist on mount and when userId changes
  useEffect(() => {
    if (!userIdLoading && userId) {
      loadWishlist();
    }
  }, [userId, userIdLoading, loadWishlist]);

  const isInWishlistCheck = useCallback(
    (productId: string): boolean => {
      return items.some(item => item.product_id === productId);
    },
    [items]
  );

  const toggleWishlistItem = useCallback(
    async (productId: string) => {
      if (!userId) return;

      try {
        const result = await wishlistService.toggleWishlist(userId, productId);
        await loadWishlist();
        
        if (result.added) {
          Alert.alert('Sucesso', 'Produto adicionado aos favoritos! ❤️');
        } else {
          Alert.alert('Removido', 'Produto removido dos favoritos.');
        }
      } catch (error) {
        console.error('Error toggling wishlist:', error);
        Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
      }
    },
    [userId, loadWishlist]
  );

  const removeFromWishlistItem = useCallback(
    async (itemId: string) => {
      try {
        await wishlistService.removeFromWishlist(itemId);
        await loadWishlist();
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        Alert.alert('Erro', 'Não foi possível remover o item.');
      }
    },
    [loadWishlist]
  );

  const clearWishlistAll = useCallback(async () => {
    if (!userId) return;

    try {
      await wishlistService.clearWishlist(userId);
      setItems([]);
      await AsyncStorage.removeItem(STORAGE_KEYS.WISHLIST_BACKUP);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      Alert.alert('Erro', 'Não foi possível limpar os favoritos.');
    }
  }, [userId]);

  const refreshWishlist = useCallback(async () => {
    await loadWishlist();
  }, [loadWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isLoading: isLoading || userIdLoading,
        totalItems,
        isInWishlist: isInWishlistCheck,
        toggleWishlist: toggleWishlistItem,
        removeFromWishlist: removeFromWishlistItem,
        clearWishlist: clearWishlistAll,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

