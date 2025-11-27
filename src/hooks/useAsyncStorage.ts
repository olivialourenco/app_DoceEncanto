import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic hook for persisting state in AsyncStorage
 * Handles JSON serialization/deserialization automatically
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => Promise<void>, boolean] {
  const [state, setState] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  // Load initial value from storage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setState(JSON.parse(stored));
        }
      } catch (error) {
        console.error(`Error loading ${key} from AsyncStorage:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadValue();
  }, [key]);

  // Persist value to storage
  const setValue = useCallback(
    async (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(state) : value;
        setState(newValue);
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error saving ${key} to AsyncStorage:`, error);
      }
    },
    [key, state]
  );

  return [state, setValue, loading];
}

/**
 * Simple hook for reading/writing string values
 */
export function useStringStorage(
  key: string,
  defaultValue: string = ''
): [string, (value: string) => Promise<void>, boolean] {
  const [state, setState] = useState<string>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setState(stored);
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadValue();
  }, [key]);

  const setValue = useCallback(
    async (value: string) => {
      try {
        setState(value);
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error saving ${key}:`, error);
      }
    },
    [key]
  );

  return [state, setValue, loading];
}

/**
 * Hook for boolean preferences (like music on/off)
 */
export function useBooleanStorage(
  key: string,
  defaultValue: boolean = false
): [boolean, (value: boolean) => Promise<void>, boolean] {
  const [state, setState] = useState<boolean>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setState(stored === 'true');
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadValue();
  }, [key]);

  const setValue = useCallback(
    async (value: boolean) => {
      try {
        setState(value);
        await AsyncStorage.setItem(key, String(value));
      } catch (error) {
        console.error(`Error saving ${key}:`, error);
      }
    },
    [key]
  );

  return [state, setValue, loading];
}

