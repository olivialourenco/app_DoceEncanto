import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { AppProviders, useCart, useWishlist, useTheme } from './src/contexts';
import {
  HomeScreen,
  ProductsScreen,
  ProductDetailsScreen,
  CartScreen,
  WishlistScreen,
  AddressScreen,
} from './src/screens';
import { colors as defaultColors } from './src/theme';

// Navigation types
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Splash Screen Component - Doce Encanto
function CustomSplash({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    // Show our custom splash for 2 seconds
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.logoCircle}>
        <Text style={splashStyles.emoji}>🍫</Text>
      </View>
      <Text style={splashStyles.title}>Doce Encanto</Text>
      <Text style={splashStyles.subtitle}>Brigaderia Artesanal</Text>
      <Text style={splashStyles.footer}>Feito com 💖 e muito chocolate</Text>
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFD6E0',
    borderWidth: 5,
    borderColor: '#F8B4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5D3A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8A4B4',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 14,
    color: '#A0887A',
  },
});

// Products stack navigator (for product details)
function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsList" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

// Home stack navigator
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

// Wishlist stack navigator
function WishlistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WishlistMain" component={WishlistScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

// Tab badge component
function TabBarIcon({ name, focused, color, size, badge }: {
  name: string;
  focused: boolean;
  color: string;
  size: number;
  badge?: number;
}) {
  const iconName = focused ? name : `${name}-outline`;
  return (
    <View style={tabStyles.iconContainer}>
      <Ionicons
        name={iconName as any}
        size={size}
        color={color}
      />
      {badge !== undefined && badge > 0 && (
        <View style={tabStyles.badge}>
          <View style={tabStyles.badgeDot} />
        </View>
      )}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
  },
  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F8B4C4',
  },
});

// Main tab navigator with theme support
function MainTabs() {
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          let badge: number | undefined;

          switch (route.name) {
            case 'Início':
              iconName = 'home';
              break;
            case 'Produtos':
              iconName = 'grid';
              break;
            case 'Carrinho':
              iconName = 'cart';
              badge = cartItems;
              break;
            case 'Favoritos':
              iconName = 'heart';
              badge = wishlistItems;
              break;
            case 'Endereço':
              iconName = 'location';
              break;
          }

          return (
            <TabBarIcon
              name={iconName}
              focused={focused}
              color={color}
              size={size}
              badge={badge}
            />
          );
        },
        tabBarActiveTintColor: colors.chocolateBrown,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.creamDark,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontFamily: 'FontePadrao',
          fontSize: 11,
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Produtos" component={ProductsStack} />
      <Tab.Screen name="Carrinho" component={CartScreen} />
      <Tab.Screen name="Favoritos" component={WishlistStack} />
      <Tab.Screen name="Endereço" component={AddressScreen} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  const [fonteCarregada] = useFonts({ FontePadrao: Montserrat_400Regular });
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Show loading while fonts load
  if (!fonteCarregada) {
    return (
      <View style={styles.loading}>
        <View style={splashStyles.logoCircle}>
          <Text style={splashStyles.emoji}>🍫</Text>
        </View>
      </View>
    );
  }

  // Show our custom Doce Encanto splash
  if (showSplash) {
    return <CustomSplash onFinish={handleSplashFinish} />;
  }

  return (
    <AppProviders>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
