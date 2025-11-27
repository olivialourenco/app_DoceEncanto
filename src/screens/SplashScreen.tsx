import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme';
import { Texto } from '../components';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.emojiCircle}>
          <Texto style={styles.emoji}>🍫</Texto>
        </View>
        <Texto style={styles.title}>Doce Encanto</Texto>
        <Texto style={styles.subtitle}>Brigaderia Artesanal</Texto>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Texto style={styles.footerText}>Feito com 💖 e muito chocolate</Texto>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  emojiCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.pastelPinkLight,
    borderWidth: 5,
    borderColor: colors.pastelPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.pastelPinkDark,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});



