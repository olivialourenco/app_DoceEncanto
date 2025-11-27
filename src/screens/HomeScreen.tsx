import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product, StoreInfo } from '../types';
import { getProducts, fetchStoreInfo } from '../services';
import { Texto, ProductCard, MusicToggle } from '../components';
import { colors, spacing, borderRadius, shadows } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [productsData, storeData] = await Promise.all([
        getProducts(),
        fetchStoreInfo(),
      ]);
      setProducts(productsData);
      setStoreInfo(storeData);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  // Get highlighted products (first 4 for display)
  const highlightedProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.pastelPink} />
        <Texto style={styles.loadingText}>Carregando doces...</Texto>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.pastelPink]}
          tintColor={colors.pastelPink}
        />
      }
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Texto style={styles.logoEmoji}>🍫</Texto>
            <View>
              <Texto style={styles.storeName}>Doce Encanto</Texto>
              <Texto style={styles.storeTagline}>Brigaderia Artesanal</Texto>
            </View>
          </View>
          <MusicToggle size="medium" />
        </View>
      </View>

      {/* Store Message Banner */}
      {storeInfo && (
        <View style={styles.banner}>
          <Texto style={styles.bannerMessage}>{storeInfo.message}</Texto>
          {storeInfo.promotion && (
            <Texto style={styles.bannerPromotion}>{storeInfo.promotion}</Texto>
          )}
          <Texto style={styles.bannerHours}>
            🕐 {storeInfo.openingHours}
          </Texto>
        </View>
      )}

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Texto style={styles.welcomeTitle}>Bem-vindo!</Texto>
        <Texto style={styles.welcomeText}>
          Descubra nossos brigadeiros artesanais, bolos deliciosos e muito mais! 
          Tudo feito com amor e ingredientes selecionados.
        </Texto>
      </View>

      {/* Highlighted Products */}
      <View style={styles.section}>
        <Texto style={styles.sectionTitle}>✨ Destaques</Texto>
        <View style={styles.productsGrid}>
          {highlightedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
              compact
            />
          ))}
        </View>
      </View>

      {/* Categories Preview */}
      <View style={styles.categoriesSection}>
        <Texto style={styles.sectionTitle}>🍰 Nossas Categorias</Texto>
        <View style={styles.categoriesGrid}>
          <View style={styles.categoryCard}>
            <Texto style={styles.categoryEmoji}>🍫</Texto>
            <Texto style={styles.categoryName}>Brigadeiros</Texto>
          </View>
          <View style={styles.categoryCard}>
            <Texto style={styles.categoryEmoji}>🎂</Texto>
            <Texto style={styles.categoryName}>Bolos</Texto>
          </View>
          <View style={styles.categoryCard}>
            <Texto style={styles.categoryEmoji}>🥧</Texto>
            <Texto style={styles.categoryName}>Tortas</Texto>
          </View>
          <View style={styles.categoryCard}>
            <Texto style={styles.categoryEmoji}>🍪</Texto>
            <Texto style={styles.categoryName}>Cookies</Texto>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Texto style={styles.footerText}>
          💖 Feito com amor pela Brigaderia Doce Encanto
        </Texto>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: spacing.xxl,
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
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    ...shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 40,
    marginRight: spacing.sm,
  },
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  storeTagline: {
    fontSize: 12,
    color: colors.pastelPinkDark,
    fontWeight: '500',
  },
  banner: {
    backgroundColor: colors.pastelPinkLight,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  bannerMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateBrown,
    textAlign: 'center',
  },
  bannerPromotion: {
    fontSize: 14,
    color: colors.chocolateDark,
    marginTop: spacing.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  bannerHours: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  welcomeSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.sm,
  },
  welcomeText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.md,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoriesSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.chocolateBrown,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});

