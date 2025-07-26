import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { WelcomeStep } from '../../components/onboarding/WelcomeStep';
import { FreeStarterSliceStep } from '../../components/onboarding/FreeStarterSliceStep';
import { HowItWorksStep } from '../../components/onboarding/HowItWorksStep';
import { useOnboardingStore } from '../../store/onboardingStore';
import { useAuthStore } from '../../store/authStore';
import { colors } from '@stack/ui-library';

const TOTAL_STEPS = 3;

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setHasCompletedOnboarding,
    setHasAcceptedStarterSlice,
    setCurrentStep: setOnboardingStep,
    setLoading,
    setError,
    clearError,
  } = useOnboardingStore();

  const { user } = useAuthStore();

  useEffect(() => {
    setOnboardingStep(currentStep);
  }, [currentStep, setOnboardingStep]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setHasCompletedOnboarding(true);
    router.replace('/(tabs)');
  };

  const handleStarterSliceAccept = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to continue');
      return;
    }

    setIsLoading(true);
    setLoading(true);
    clearError();

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/onboarding/starter-investment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create starter investment');
      }

      setHasAcceptedStarterSlice(true);
      Alert.alert('Success!', 'Your $25 starter investment has been created. Welcome to STACK!', [
        { text: 'Continue', onPress: handleNext },
      ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            onNext={handleNext}
            onSkip={handleSkip}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 1:
        return (
          <FreeStarterSliceStep
            onNext={handleNext}
            onSkip={handleSkip}
            onAccept={handleStarterSliceAccept}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <HowItWorksStep
            onNext={handleComplete}
            onSkip={handleSkip}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStep()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});
