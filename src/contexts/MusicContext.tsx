import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useAudioPlayer } from 'expo-audio';
import { useBooleanStorage } from '../hooks/useAsyncStorage';
import { STORAGE_KEYS } from '../types';

interface MusicContextType {
  isPlaying: boolean;
  isMusicEnabled: boolean;
  toggleMusic: () => void;
  setMusicEnabled: (enabled: boolean) => void;
  isLoading: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Background music source - using a royalty-free lo-fi track URL
// In production, you'd use a local asset or a proper licensed track
const MUSIC_SOURCE = require('../../assets/acdc_highway_to_hell.mp3');

interface MusicProviderProps {
  children: ReactNode;
}

export function MusicProvider({ children }: MusicProviderProps) {
  const [isMusicEnabled, setMusicEnabledStorage, isLoadingPreference] = useBooleanStorage(
    STORAGE_KEYS.MUSIC_ENABLED,
    false // Default to off to respect platform autoplay restrictions
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer(MUSIC_SOURCE);

  // Sync player state with enabled preference
  useEffect(() => {
    if (!isLoadingPreference) {
      if (isMusicEnabled && !player.playing) {
        player.loop = true;
        player.play();
        setIsPlaying(true);
      } else if (!isMusicEnabled && player.playing) {
        player.pause();
        setIsPlaying(false);
      }
    }
  }, [isMusicEnabled, isLoadingPreference, player]);

  // Update isPlaying state when player state changes
  useEffect(() => {
    setIsPlaying(player.playing);
  }, [player.playing]);

  const toggleMusic = useCallback(() => {
    if (player.playing) {
      player.pause();
      setIsPlaying(false);
      setMusicEnabledStorage(false);
    } else {
      player.loop = true;
      player.play();
      setIsPlaying(true);
      setMusicEnabledStorage(true);
    }
  }, [player, setMusicEnabledStorage]);

  const setMusicEnabled = useCallback(
    async (enabled: boolean) => {
      await setMusicEnabledStorage(enabled);
      if (enabled && !player.playing) {
        player.loop = true;
        player.play();
        setIsPlaying(true);
      } else if (!enabled && player.playing) {
        player.pause();
        setIsPlaying(false);
      }
    },
    [player, setMusicEnabledStorage]
  );

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMusicEnabled,
        toggleMusic,
        setMusicEnabled,
        isLoading: isLoadingPreference,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextType {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

