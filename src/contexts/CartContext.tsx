import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserId } from '../hooks/useUserId';
import { CartItem, STORAGE_KEYS } from '../types';
import * as cartService from '../services/cartService';

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [userId, userIdLoading] = useUserId();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartService.calculateCartTotal(items);

  // Backup cart to AsyncStorage (for offline support)
  const backupCart = useCallback(async (cartItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CART_BACKUP, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error backing up cart:', error);
    }
  }, []);

  // Load cart from Supabase
  const loadCart = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const cartItems = await cartService.getCartItems(userId);
      setItems(cartItems);
      backupCart(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      // Try to load from backup
      try {
        const backup = await AsyncStorage.getItem(STORAGE_KEYS.CART_BACKUP);
        if (backup) {
          setItems(JSON.parse(backup));
        }
      } catch (backupError) {
        console.error('Error loading cart backup:', backupError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, backupCart]);

  // Load cart on mount and when userId changes
  useEffect(() => {
    if (!userIdLoading && userId) {
      loadCart();
    }
  }, [userId, userIdLoading, loadCart]);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      if (!userId) return;

      try {
        await cartService.addToCart(userId, productId, quantity);
        await loadCart();
        Alert.alert('Sucesso', 'Produto adicionado ao carrinho! 🛒');
      } catch (error) {
        console.error('Error adding to cart:', error);
        Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
      }
    },
    [userId, loadCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        await cartService.updateCartItemQuantity(itemId, quantity);
        await loadCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a quantidade.');
      }
    },
    [loadCart]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      try {
        await cartService.removeFromCart(itemId);
        await loadCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
        Alert.alert('Erro', 'Não foi possível remover o item.');
      }
    },
    [loadCart]
  );

  const clearCart = useCallback(async () => {
    if (!userId) return;

    try {
      await cartService.clearCart(userId);
      setItems([]);
      await AsyncStorage.removeItem(STORAGE_KEYS.CART_BACKUP);
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Erro', 'Não foi possível limpar o carrinho.');
    }
  }, [userId]);

  const refreshCart = useCallback(async () => {
    await loadCart();
  }, [loadCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading: isLoading || userIdLoading,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}



