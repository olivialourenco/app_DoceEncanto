import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WishlistItem } from '../types';
import { useWishlist, useCart, useTheme } from '../contexts';
import Texto from './Texto';
import { borderRadius, spacing, shadows } from '../theme';

interface WishlistItemCardProps {
  item: WishlistItem;
  onPress: () => void;
}

export default function WishlistItemCard({ item, onPress }: WishlistItemCardProps) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const product = item.product;

  const styles = createStyles(colors);

  if (!product) return null;

  const handleRemove = () => {
    removeFromWishlist(item.id);
  };

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: product.image_url }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Texto style={styles.category}>{product.category}</Texto>
          <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="heart" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>

        <Texto style={styles.name} numberOfLines={2}>
          {product.name}
        </Texto>

        <View style={styles.footer}>
          <Texto style={styles.price}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </Texto>

          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={16} color={colors.textLight} />
            <Texto style={styles.addButtonText}>Adicionar</Texto>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  image: {
    width: 110,
    height: 120,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 11,
    color: colors.pastelPinkDark,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.chocolateBrown,
    marginVertical: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pastelPink,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },
});
