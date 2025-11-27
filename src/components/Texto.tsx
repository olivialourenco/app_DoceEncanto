import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../theme';

interface TextoProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: 'body' | 'title' | 'subtitle' | 'caption' | 'button';
}

export default function Texto({ children, style, variant = 'body' }: TextoProps) {
  return (
    <Text style={[estilos.padrao, estilos[variant], style]}>
      {children}
    </Text>
  );
}

const estilos = StyleSheet.create({
  padrao: {
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.sizes.md,
    lineHeight: 24,
  },
  title: {
    fontSize: typography.sizes.title,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    lineHeight: 28,
  },
  caption: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
  },
  button: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    textAlign: 'center',
  },
});

