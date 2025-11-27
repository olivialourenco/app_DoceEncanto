import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Product } from '../types';
import { useCart, useWishlist } from '../contexts';
import { Texto } from '../components';
import { colors, spacing, borderRadius, shadows } from '../theme';

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { product } = route.params as { product: Product };
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Image with overlay header */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleWishlist}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.error : colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryBadge}>
          <Texto style={styles.categoryText}>{product.category}</Texto>
        </View>

        <Texto style={styles.name}>{product.name}</Texto>

        <View style={styles.priceContainer}>
          <Texto style={styles.price}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </Texto>
          {product.available && (
            <View style={styles.availableBadge}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Texto style={styles.availableText}>Disponível</Texto>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <Texto style={styles.descriptionTitle}>Descrição</Texto>
        <Texto style={styles.description}>{product.description}</Texto>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="gift-outline" size={20} color={colors.pastelPinkDark} />
            <Texto style={styles.infoText}>Embalagem especial</Texto>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="heart-outline" size={20} color={colors.pastelPinkDark} />
            <Texto style={styles.infoText}>Feito com amor</Texto>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star-outline" size={20} color={colors.pastelPinkDark} />
            <Texto style={styles.infoText}>Ingredientes premium</Texto>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleToggleWishlist}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.error : colors.chocolateBrown}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color={colors.white} />
          <Texto style={styles.addToCartText}>Adicionar ao Carrinho</Texto>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.round,
    padding: spacing.sm,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.round,
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    backgroundColor: colors.cream,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -spacing.lg,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  categoryBadge: {
    backgroundColor: colors.pastelPinkLight,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    marginBottom: spacing.sm,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.chocolateBrown,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  availableText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.creamDark,
    marginVertical: spacing.lg,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  infoSection: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionBar: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.creamDark,
    gap: spacing.md,
    ...shadows.lg,
  },
  wishlistButton: {
    backgroundColor: colors.cream,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.pastelPink,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

