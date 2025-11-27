import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../types';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  isLoading: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export function MusicProvider({ children }: MusicProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load saved preference and initialize audio
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Configure audio mode
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        // Load the sound
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/acdc_highway_to_hell.mp3'),
          { isLooping: true, volume: 0.5 }
        );
        soundRef.current = sound;

        // Check saved preference
        const savedPref = await AsyncStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED);
        if (savedPref === 'true') {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAudio();

    // Cleanup on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const toggleMusic = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      const status = await soundRef.current.getStatusAsync();
      
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
          await AsyncStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, 'false');
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
          await AsyncStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, 'true');
        }
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        isLoading,
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
