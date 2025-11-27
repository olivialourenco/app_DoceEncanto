import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Note: In production, these should be environment variables
const supabaseUrl = 'https://vwicvphqasufjcgdochs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWN2cGhxYXN1ZmpjZ2RvY2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjIyMTMsImV4cCI6MjA3OTgzODIxM30.NitM16wEmQ8y0BkuPcqVTHUCWZYU3jwFsXk-ervQwg8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;

