import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OnboardingState {
  // Onboarding progress
  hasCompletedOnboarding: boolean;
  hasAcceptedStarterSlice: boolean;
  currentStep: number;

  // Loading states
  isLoading: boolean;

  // Error handling
  error: string | null;

  // Actions
  setCurrentStep: (step: number) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  setHasAcceptedStarterSlice: (accepted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      // Initial state
      hasCompletedOnboarding: false,
      hasAcceptedStarterSlice: false,
      currentStep: 0,
      isLoading: false,
      error: null,

      // Actions
      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      setHasCompletedOnboarding: (completed: boolean) => {
        set({ hasCompletedOnboarding: completed });
      },

      setHasAcceptedStarterSlice: (accepted: boolean) => {
        set({ hasAcceptedStarterSlice: accepted });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      resetOnboarding: () => {
        set({
          hasCompletedOnboarding: false,
          hasAcceptedStarterSlice: false,
          currentStep: 0,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
