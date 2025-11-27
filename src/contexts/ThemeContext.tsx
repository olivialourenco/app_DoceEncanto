import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@brigaderia:theme';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

// Cores do tema claro (atual)
const lightColors = {
  // Primary colors
  chocolateBrown: '#5D3A1A',
  chocolateDark: '#3E2712',
  chocolateLight: '#8B5A2B',
  
  // Accent colors
  pastelPink: '#F8B4C4',
  pastelPinkLight: '#FFD6E0',
  pastelPinkDark: '#E8A4B4',
  
  // Neutral colors
  cream: '#FFF8E7',
  creamDark: '#F5ECD7',
  white: '#FFFFFF',
  
  // Utility colors
  success: '#4CAF50',
  error: '#E57373',
  warning: '#FFB74D',
  
  // Text colors
  textPrimary: '#3E2712',
  textSecondary: '#8B5A2B',
  textLight: '#FFFFFF',
  textMuted: '#A0887A',
};

// Cores do tema escuro
const darkColors = {
  // Primary colors
  chocolateBrown: '#D4A574',
  chocolateDark: '#E8C9A0',
  chocolateLight: '#C49A6C',
  
  // Accent colors
  pastelPink: '#C4687A',
  pastelPinkLight: '#8B4A5A',
  pastelPinkDark: '#D4788A',
  
  // Neutral colors
  cream: '#1A1A1A',
  creamDark: '#2D2D2D',
  white: '#252525',
  
  // Utility colors
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFA726',
  
  // Text colors
  textPrimary: '#F5ECD7',
  textSecondary: '#D4C4B0',
  textLight: '#1A1A1A',
  textMuted: '#A09080',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme preference
  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'dark') {
          setIsDark(true);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newValue ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDark]);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}



