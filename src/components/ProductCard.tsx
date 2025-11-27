import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Product } from '../types';
import { useWishlist } from '../contexts';
import Texto from './Texto';
import { colors, borderRadius, spacing, shadows } from '../theme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  compact?: boolean;
}

export default function ProductCard({ product, onPress, compact = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

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
            size={22}
            color={isFavorite ? colors.error : colors.chocolateBrown}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Texto style={styles.category}>{product.category}</Texto>
        <Texto style={styles.name} numberOfLines={2}>
          {product.name}
        </Texto>
        {!compact && (
          <Texto style={styles.description} numberOfLines={2}>
            {product.description}
          </Texto>
        )}
        <Texto style={styles.price}>
          R$ {product.price.toFixed(2).replace('.', ',')}
        </Texto>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cardCompact: {
    flex: 1,
    marginHorizontal: spacing.xs,
    maxWidth: '48%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  imageCompact: {
    height: 140,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.round,
    padding: spacing.xs,
    ...shadows.sm,
  },
  content: {
    padding: spacing.md,
  },
  category: {
    fontSize: 11,
    color: colors.pastelPinkDark,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
});

