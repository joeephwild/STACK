import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, apiClient, RegisterData } from '../lib/api';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (walletAddress: string, signature: string, payload: any) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      login: async (walletAddress, signature, payload) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiClient.login(payload, signature);
          
          if (response.success && response.user) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiClient.register(data);
          
          if (response.success && response.user) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await apiClient.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        } catch (error) {
          // Even if logout fails on server, clear local state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Logout failed'
          });
        }
      },

      checkAuthStatus: async () => {
        try {
          set({ isLoading: true });
          const response = await apiClient.getAuthStatus();
          
          if (response.success && response.user) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Auth check failed'
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);