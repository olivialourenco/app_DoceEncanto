import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product, StoreInfo } from '../types';
import { getProducts, fetchStoreInfo } from '../services';
import { Texto, ProductCard, MusicToggle, ThemeToggle } from '../components';
import { useTheme } from '../contexts';
import { spacing, borderRadius, shadows } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
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

  const styles = createStyles(colors);

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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.pastelPink]}
          tintColor={colors.pastelPink}
        />
      }
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.cream} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🍫</Text>
            </View>
            <View style={styles.logoTextContainer}>
              <Texto style={styles.storeName}>Doce Encanto</Texto>
              <Texto style={styles.storeTagline}>Brigaderia Artesanal</Texto>
            </View>
          </View>
          <View style={styles.headerButtons}>
            <MusicToggle size="small" />
            <ThemeToggle size="small" />
          </View>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>✨</Text>
          <Texto style={styles.sectionTitle}>Destaques</Texto>
        </View>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🍰</Text>
          <Texto style={styles.sectionTitle}>Nossas Categorias</Texto>
        </View>
        <View style={styles.categoriesGrid}>
          {[
            { emoji: '🍫', name: 'Brigadeiros' },
            { emoji: '🎂', name: 'Bolos' },
            { emoji: '🥧', name: 'Tortas' },
            { emoji: '🍪', name: 'Cookies' },
          ].map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryCard}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Texto style={styles.categoryName}>{cat.name}</Texto>
            </TouchableOpacity>
          ))}
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

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: spacing.xxl + 20,
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
    flex: 1,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.pastelPinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  logoEmoji: {
    fontSize: 24,
    textAlign: 'center',
  },
  logoTextContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  storeTagline: {
    fontSize: 11,
    color: colors.pastelPinkDark,
    fontWeight: '500',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  banner: {
    backgroundColor: colors.pastelPinkLight,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  bannerMessage: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.chocolateBrown,
    textAlign: 'center',
  },
  bannerPromotion: {
    fontSize: 13,
    color: colors.chocolateDark,
    marginTop: spacing.xs,
    textAlign: 'center',
    fontWeight: '600',
  },
  bannerHours: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  welcomeSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.chocolateBrown,
    marginBottom: spacing.xs,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionEmoji: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.chocolateBrown,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoriesSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.chocolateBrown,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
