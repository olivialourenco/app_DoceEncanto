import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Note: In production, these should be environment variables
const supabaseUrl = 'https://roxefslcjfehxitcxppl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJveGVmc2xjamZlaHhpdGN4cHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjkwNjEsImV4cCI6MjA2MjA0NTA2MX0.IsXLyqUPCpqDdRpJJiKgAg4JrqLnGhPjr5P4vVjbfxw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;

