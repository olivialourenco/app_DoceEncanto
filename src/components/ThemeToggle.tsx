import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing, shadows } from '../theme';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
}

export default function ThemeToggle({ size = 'medium' }: ThemeToggleProps) {
  const { isDark, toggleTheme, colors } = useTheme();

  const iconSize = size === 'small' ? 16 : size === 'large' ? 26 : 20;
  const buttonSize = size === 'small' ? 32 : size === 'large' ? 48 : 40;

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        { 
          width: buttonSize, 
          height: buttonSize,
          backgroundColor: isDark ? '#3D3D3D' : '#FFF8E7',
        },
      ]}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={iconSize}
        color={isDark ? '#FFD700' : '#5D3A1A'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.round,
    ...shadows.sm,
  },
});



