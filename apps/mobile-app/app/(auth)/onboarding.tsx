import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { WelcomeStep } from '../../components/onboarding/WelcomeStep';
import { FreeStarterSliceStep } from '../../components/onboarding/FreeStarterSliceStep';
import { HowItWorksStep } from '../../components/onboarding/HowItWorksStep';
import { colors } from '@stack/ui-library';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const steps = [
    { component: WelcomeStep, key: 'welcome' },
    { component: FreeStarterSliceStep, key: 'starter-slice' },
    { component: HowItWorksStep, key: 'how-it-works' },
  ];

  const animateToNextStep = (nextStep: number) => {
    setIsTransitioning(true);

    // Slide out current step
    translateX.value = withTiming(-screenWidth, { duration: 300 });
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.95, { duration: 300 });

    setTimeout(() => {
      setCurrentStep(nextStep);

      // Reset position for slide in
      translateX.value = screenWidth;
      opacity.value = 0;
      scale.value = 1.05;

      // Slide in new step
      translateX.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 400 });
      scale.value = withSpring(1, { damping: 20, stiffness: 90 });

      setTimeout(() => setIsTransitioning(false), 400);
    }, 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;

    if (currentStep < steps.length - 1) {
      animateToNextStep(currentStep + 1);
    } else {
      // Complete onboarding with fade out animation
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.9, { duration: 300 });

      setTimeout(() => {
        router.replace('/(tabs)');
      }, 300);
    }
  };

  const handleSkip = () => {
    if (isTransitioning) return;

    // Skip with fade out animation
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.9, { duration: 300 });

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 300);
  };

  const handleStarterSliceAccept = async () => {
    setIsLoading(true);
    try {
      // This will be handled by the FreeStarterSliceStep component
      // which will call the onboarding API and create wallet
      handleNext();
    } catch (error) {
      console.error('Error accepting starter slice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  // Background gradient animation
  const backgroundOpacity = useSharedValue(1);
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      currentStep,
      [0, 1, 2],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor: `rgba(79, 70, 229, ${backgroundColor * 0.05})`,
    };
  });

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.main }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.main} />

      {/* Animated background */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
          backgroundAnimatedStyle
        ]}
      />

      {/* Main content with slide animation */}
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <CurrentStepComponent
          onNext={handleNext}
          onSkip={handleSkip}
          onAcceptStarterSlice={handleStarterSliceAccept}
          isLoading={isLoading}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </Animated.View>
    </View>
  );
}
