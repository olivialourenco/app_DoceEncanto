import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppProviders, useCart, useWishlist } from './src/contexts';
import {
  HomeScreen,
  ProductsScreen,
  ProductDetailsScreen,
  CartScreen,
  WishlistScreen,
  AddressScreen,
} from './src/screens';
import { colors } from './src/theme';

// Navigation types
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={size}
        color={color}
      />
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Ionicons name="ellipse" size={16} color={colors.pastelPink} />
        </View>
      )}
    </View>
  );
}

// Main tab navigator
function MainTabs() {
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

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
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
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

  if (!fonteCarregada) {
    return <View style={styles.loading} />;
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
    backgroundColor: colors.cream,
  },
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.creamDark,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 65,
  },
  tabBarLabel: {
    fontFamily: 'FontePadrao',
    fontSize: 11,
    marginTop: 2,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
  },
});
