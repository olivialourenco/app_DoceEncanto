import React, { ReactNode } from 'react';
import { MusicProvider } from './MusicContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { ThemeProvider } from './ThemeContext';

export { MusicProvider, useMusic } from './MusicContext';
export { CartProvider, useCart } from './CartContext';
export { WishlistProvider, useWishlist } from './WishlistContext';
export { ThemeProvider, useTheme } from './ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Combined provider component that wraps the app with all necessary contexts
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <MusicProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </MusicProvider>
    </ThemeProvider>
  );
}
