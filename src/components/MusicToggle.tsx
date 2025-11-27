import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMusic } from '../contexts';
import Texto from './Texto';
import { colors, borderRadius, spacing, shadows } from '../theme';

interface MusicToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function MusicToggle({ showLabel = false, size = 'medium' }: MusicToggleProps) {
  const { isPlaying, toggleMusic, isLoading } = useMusic();

  const iconSize = size === 'small' ? 18 : size === 'large' ? 28 : 22;
  const buttonSize = size === 'small' ? 36 : size === 'large' ? 52 : 44;

  if (isLoading) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={toggleMusic}
      style={[
        styles.button,
        { width: showLabel ? 'auto' : buttonSize, height: buttonSize },
        isPlaying && styles.buttonActive,
      ]}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isPlaying ? 'musical-notes' : 'musical-notes-outline'}
        size={iconSize}
        color={isPlaying ? colors.white : colors.chocolateBrown}
      />
      {showLabel && (
        <Texto
          style={[
            styles.label,
            { color: isPlaying ? colors.white : colors.chocolateBrown },
          ]}
        >
          {isPlaying ? 'Música ON' : 'Música OFF'}
        </Texto>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    ...shadows.md,
  },
  buttonActive: {
    backgroundColor: colors.pastelPink,
  },
  label: {
    marginLeft: spacing.sm,
    fontSize: 14,
    fontWeight: '600',
  },
});

