import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { useWishlist, useTheme } from '../contexts';
import Texto from './Texto';
import { borderRadius, spacing, shadows } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = spacing.sm;
const COMPACT_CARD_WIDTH = (SCREEN_WIDTH - spacing.md * 2 - CARD_MARGIN * 2) / 2;

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  compact?: boolean;
}

export default function ProductCard({ product, onPress, compact = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { colors } = useTheme();
  const isFavorite = isInWishlist(product.id);

  const styles = createStyles(colors);

  const handleFavoritePress = () => {
    toggleWishlist(product.id);
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image_url }}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? colors.error : colors.chocolateBrown}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, compact && styles.contentCompact]}>
        <Texto style={[styles.category, compact && styles.categoryCompact]} numberOfLines={1}>
          {product.category}
        </Texto>
        <Texto style={[styles.name, compact && styles.nameCompact]} numberOfLines={2}>
          {product.name}
        </Texto>
        {!compact && (
          <Texto style={styles.description} numberOfLines={2}>
            {product.description}
          </Texto>
        )}
        <Texto style={[styles.price, compact && styles.priceCompact]}>
          R$ {product.price.toFixed(2).replace('.', ',')}
        </Texto>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cardCompact: {
    width: COMPACT_CARD_WIDTH,
    marginHorizontal: CARD_MARGIN / 2,
    marginBottom: spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCompact: {
    // Uses aspectRatio from container
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: borderRadius.round,
    padding: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  contentCompact: {
    padding: spacing.sm,
  },
  category: {
    fontSize: 10,
    color: colors.pastelPinkDark,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  categoryCompact: {
    fontSize: 9,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  nameCompact: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
  priceCompact: {
    fontSize: 13,
  },
});
