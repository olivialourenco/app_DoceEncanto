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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WishlistItem } from '../types';
import { useWishlist, useTheme } from '../contexts';
import { Texto, WishlistItemCard, MusicToggle, ThemeToggle } from '../components';
import { spacing, borderRadius, shadows } from '../theme';

export default function WishlistScreen() {
  const navigation = useNavigation<any>();
  const { items, isLoading, totalItems, clearWishlist } = useWishlist();
  const { colors, isDark } = useTheme();

  const styles = createStyles(colors);

  const handleClearWishlist = () => {
    Alert.alert(
      'Limpar Favoritos',
      'Tem certeza que deseja remover todos os itens dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearWishlist },
      ]
    );
  };

  const handleProductPress = (item: WishlistItem) => {
    if (item.product) {
      navigation.navigate('ProductDetails', { product: item.product });
    }
  };

  const renderItem = ({ item }: { item: WishlistItem }) => (
    <WishlistItemCard item={item} onPress={() => handleProductPress(item)} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyEmoji}>❤️</Text>
      </View>
      <Texto style={styles.emptyTitle}>Lista de desejos vazia</Texto>
      <Texto style={styles.emptyText}>
        Adicione produtos aos favoritos tocando no coração!
      </Texto>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.pastelPink} />
        <Texto style={styles.loadingText}>Carregando favoritos...</Texto>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerEmoji}>❤️</Text>
          <Texto style={styles.headerTitle}>Favoritos</Texto>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Texto style={styles.badgeText}>{totalItems}</Texto>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          {items.length > 0 && (
            <TouchableOpacity onPress={handleClearWishlist} style={styles.clearButton}>
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
    backgroundColor: colors.error,
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
