import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../types';
import { useCart, useTheme } from '../contexts';
import Texto from './Texto';
import { borderRadius, spacing, shadows } from '../theme';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { colors } = useTheme();
  const product = item.product;

  const styles = createStyles(colors);

  if (!product) return null;

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = product.price * item.quantity;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image_url }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Texto style={styles.name} numberOfLines={2}>
            {product.name}
          </Texto>
          <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>

        <Texto style={styles.unitPrice}>
          R$ {product.price.toFixed(2).replace('.', ',')} cada
        </Texto>

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Ionicons name="remove" size={18} color={colors.chocolateBrown} />
            </TouchableOpacity>
            <Texto style={styles.quantity}>{item.quantity}</Texto>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Ionicons name="add" size={18} color={colors.chocolateBrown} />
            </TouchableOpacity>
          </View>

          <Texto style={styles.subtotal}>
            R$ {subtotal.toFixed(2).replace('.', ',')}
          </Texto>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.chocolateBrown,
    flex: 1,
    marginRight: spacing.sm,
  },
  unitPrice: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xs,
  },
  quantityButton: {
    padding: spacing.sm,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateBrown,
    minWidth: 30,
    textAlign: 'center',
  },
  subtotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
});
