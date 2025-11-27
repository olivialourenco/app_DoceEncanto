import React from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic, useTheme } from '../contexts';
import Texto from './Texto';
import { borderRadius, spacing, shadows } from '../theme';

interface MusicToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function MusicToggle({ showLabel = false, size = 'medium' }: MusicToggleProps) {
  const { isPlaying, toggleMusic, isLoading } = useMusic();
  const { colors, isDark } = useTheme();

  const iconSize = size === 'small' ? 16 : size === 'large' ? 26 : 20;
  const buttonSize = size === 'small' ? 32 : size === 'large' ? 48 : 40;

  const styles = createStyles(colors, isDark);

  if (isLoading) {
    return (
      <View style={[styles.button, { width: buttonSize, height: buttonSize }]}>
        <ActivityIndicator size="small" color={colors.pastelPink} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={toggleMusic}
      style={[
        styles.button,
        { width: showLabel ? undefined : buttonSize, height: buttonSize },
        showLabel && styles.buttonWithLabel,
        isPlaying && styles.buttonActive,
      ]}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isPlaying ? 'musical-notes' : 'musical-notes-outline'}
        size={iconSize}
        color={isPlaying ? colors.textLight : colors.chocolateBrown}
      />
      {showLabel && (
        <Texto
          style={[
            styles.label,
            { color: isPlaying ? colors.textLight : colors.chocolateBrown },
          ]}
        >
          {isPlaying ? 'ON' : 'OFF'}
        </Texto>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? '#3D3D3D' : colors.cream,
    borderRadius: borderRadius.round,
    ...shadows.sm,
  },
  buttonWithLabel: {
    paddingHorizontal: spacing.md,
  },
  buttonActive: {
    backgroundColor: colors.pastelPink,
  },
  label: {
    marginLeft: spacing.xs,
    fontSize: 12,
    fontWeight: '600',
  },
});
