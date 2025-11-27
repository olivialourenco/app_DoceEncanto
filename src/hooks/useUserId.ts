import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../types';

/**
 * Generates a simple UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Hook to get or create a persistent user ID
 * This is used as a device identifier since we're not implementing auth
 */
export function useUserId(): [string | null, boolean] {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUserId = async () => {
      try {
        let storedId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
        
        if (!storedId) {
          storedId = generateUUID();
          await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, storedId);
        }
        
        setUserId(storedId);
      } catch (error) {
        console.error('Error initializing user ID:', error);
        // Generate a temporary ID if storage fails
        setUserId(generateUUID());
      } finally {
        setLoading(false);
      }
    };

    initUserId();
  }, []);

  return [userId, loading];
}

