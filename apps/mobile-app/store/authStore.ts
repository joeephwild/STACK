import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, apiClient, RegisterData, LoginData, ForgotPasswordData, ResetPasswordData, EmailSignupData, VerifyEmailData, ResendVerificationData } from '../lib/api';

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
  loginWithEmail: (data: LoginData) => Promise<void>;
  signupWithEmail: (data: EmailSignupData) => Promise<void>;
  verifyEmail: (data: VerifyEmailData) => Promise<void>;
  resendVerification: (data: ResendVerificationData) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<{ success: boolean; message: string }>;
  resetPassword: (data: ResetPasswordData) => Promise<{ success: boolean; message: string }>;
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

      loginWithEmail: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.loginWithEmail(data);
          console.log('Login response:', response);

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

      signupWithEmail: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.signupWithEmail(data);
          console.log('Signup response:', response);
          set({
              isLoading: false,
              error: null
            });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed',
            isLoading: false
          });
          throw error;
        }
      },

      verifyEmail: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.verifyEmail(data);
          console.log('Email verification response:', response);

          if (response.success && response.user) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false
            });

            return response
          } else {
            throw new Error(response.message || 'Email verification failed');
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Email verification failed',
            isLoading: false
          });
          throw error;
        }
      },

      resendVerification: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.resendVerification(data);
          set({ isLoading: false });

          return response;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to resend verification email',
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

      forgotPassword: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.forgotPassword(data);
          set({ isLoading: false });

          return response;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to send reset email',
            isLoading: false
          });
          throw error;
        }
      },

      resetPassword: async (data) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.resetPassword(data);
          set({ isLoading: false });

          return response;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to reset password',
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
