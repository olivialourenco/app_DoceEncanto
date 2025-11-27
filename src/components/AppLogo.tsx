import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function AppLogo({ size = 'medium', showText = true }: AppLogoProps) {
  const dimensions = {
    small: { container: 60, emoji: 30, text: 12 },
    medium: { container: 120, emoji: 60, text: 18 },
    large: { container: 200, emoji: 100, text: 28 },
  };

  const dim = dimensions[size];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: dim.container, height: dim.container }]}>
        <Text style={[styles.emoji, { fontSize: dim.emoji }]}>🍫</Text>
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.title, { fontSize: dim.text }]}>Doce Encanto</Text>
          <Text style={[styles.subtitle, { fontSize: dim.text * 0.6 }]}>Brigaderia Artesanal</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.pastelPinkLight,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.pastelPink,
  },
  emoji: {
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'FontePadrao',
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  subtitle: {
    fontFamily: 'FontePadrao',
    color: colors.pastelPinkDark,
    marginTop: 2,
  },
});



