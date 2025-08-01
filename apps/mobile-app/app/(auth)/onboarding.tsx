import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { NotificationPermissionStep } from '../../components/onboarding/NotificationPermissionStep';
import { TrackingPermissionStep } from '../../components/onboarding/TrackingPermissionStep';
import { FreeStarterSliceStep } from '../../components/onboarding/FreeStarterSliceStep';
import { PinSetupStep } from '../../components/onboarding/PinSetupStep';
import { CompletionStep } from '../../components/onboarding/CompletionStep';
import { useOnboardingStore } from '../../store/onboardingStore';
import { useAuthStore } from '../../store/authStore';

const TOTAL_STEPS = 6;

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tempPin, setTempPin] = useState<string>('');

  const {
    setHasCompletedOnboarding,
    setHasAcceptedStarterSlice,
    setAppPin,
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
    // if (!user) {
    //   Alert.alert('Error', 'Please log in to continue');
    //   return;
    // }

    // setIsLoading(true);
    // setLoading(true);
    // clearError();

    try {

      setHasAcceptedStarterSlice(true);
      handleNext()
    //   Alert.alert('Success!', 'Your $25 starter investment has been created. Welcome to STACK!', [
    //     { text: 'Continue', onPress: handleNext },
    //   ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handlePinSetup = (pin: string) => {
    setTempPin(pin);
    handleNext();
  };

  const handlePinConfirmation = (pin: string) => {
    setAppPin(pin);
    Alert.alert('Success!', 'Your PIN has been set successfully!', [
      { text: 'Continue', onPress: handleNext },
    ]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NotificationPermissionStep
            onNext={handleNext}
            onSkip={handleNext}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 1:
        return (
          <TrackingPermissionStep
            onNext={handleNext}
            onSkip={handleNext}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 2:
        return (
          <FreeStarterSliceStep
            onAccept={handleStarterSliceAccept}
            onSkip={handleNext}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 3:
        return (
          <PinSetupStep
            onNext={handleNext}
            onSkip={handleNext}
            onPinSet={handlePinSetup}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 4:
        return (
          <PinSetupStep
            onNext={handleNext}
            onSkip={handleNext}
            onPinSet={handlePinConfirmation}
            isConfirmation={true}
            originalPin={tempPin}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 5:
        return (
          <CompletionStep
            onNext={handleComplete}
            onSkip={handleComplete}
            currentStep={currentStep + 1}
            totalSteps={TOTAL_STEPS}
          />
        );
      default:
        return null;
    }
  };

  return <View className="flex-1 bg-background-main">{renderStep()}</View>;
}
