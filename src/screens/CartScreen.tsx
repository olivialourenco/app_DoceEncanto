import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart, useTheme } from '../contexts';
import { Texto, CartItemCard, FreteCalculator, MusicToggle, ThemeToggle } from '../components';
import { spacing, borderRadius, shadows } from '../theme';

export default function CartScreen() {
  const { items, isLoading, totalItems, totalPrice, clearCart } = useCart();
  const { colors, isDark } = useTheme();

  const styles = createStyles(colors);

  const handleClearCart = () => {
    Alert.alert(
      'Limpar Carrinho',
      'Tem certeza que deseja remover todos os itens do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <CartItemCard item={item} />
  );

  const renderHeader = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryRow}>
        <Texto style={styles.summaryLabel}>Subtotal ({totalItems} itens)</Texto>
        <Texto style={styles.summaryValue}>
          R$ {totalPrice.toFixed(2).replace('.', ',')}
        </Texto>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <FreteCalculator />
      
      <View style={styles.totalCard}>
        <View style={styles.totalRow}>
          <Texto style={styles.totalLabel}>Total</Texto>
          <Texto style={styles.totalValue}>
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </Texto>
        </View>
        <Texto style={styles.totalNote}>
          * Frete calculado separadamente
        </Texto>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Ionicons name="checkmark-circle" size={20} color={colors.textLight} />
        <Texto style={styles.checkoutButtonText}>Finalizar Pedido</Texto>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
      </View>
      <Texto style={styles.emptyTitle}>Carrinho vazio</Texto>
      <Texto style={styles.emptyText}>
        Adicione alguns doces deliciosos ao seu carrinho!
      </Texto>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.pastelPink} />
        <Texto style={styles.loadingText}>Carregando carrinho...</Texto>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerEmoji}>🛒</Text>
          <Texto style={styles.headerTitle}>Meu Carrinho</Texto>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Texto style={styles.badgeText}>{totalItems}</Texto>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          {items.length > 0 && (
            <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          )}
          <MusicToggle size="small" />
          <ThemeToggle size="small" />
        </View>
      </View>

      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmpty()
      )}
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.chocolateBrown,
    fontSize: 16,
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerEmoji: {
    fontSize: 22,
    marginRight: spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  badge: {
    backgroundColor: colors.pastelPink,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginLeft: spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
  },
  clearButton: {
    padding: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl + 20,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  footer: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  totalCard: {
    backgroundColor: colors.pastelPinkLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.chocolateDark,
  },
  totalNote: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: colors.chocolateBrown,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.pastelPinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
