import React, { ReactNode } from 'react';
import { MusicProvider } from './MusicContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

export { MusicProvider, useMusic } from './MusicContext';
export { CartProvider, useCart } from './CartContext';
export { WishlistProvider, useWishlist } from './WishlistContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Combined provider component that wraps the app with all necessary contexts
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MusicProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </MusicProvider>
  );
}

