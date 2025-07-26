import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import { Button, colors, typography, spacing } from '@stack/ui-library';
import {
  ChartIcon,
  AIIcon,
  TrackingIcon,
  FractionalIcon,
  SecurityIcon,
} from '../icons/OnboardingIcons';

interface HowItWorksStepProps {
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}) => {
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const stepsOpacity = useSharedValue(0);
  const stepsTranslateY = useSharedValue(30);
  const securityOpacity = useSharedValue(0);
  const securityTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);
  const progressOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animation sequence
    progressOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));

    titleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(400, withSpring(0, { damping: 20, stiffness: 90 }));

    stepsOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    stepsTranslateY.value = withDelay(600, withSpring(0, { damping: 20, stiffness: 90 }));

    securityOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
    securityTranslateY.value = withDelay(1000, withSpring(0, { damping: 20, stiffness: 90 }));

    buttonsOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    buttonsTranslateY.value = withDelay(1200, withSpring(0, { damping: 20, stiffness: 90 }));
  }, []);

  const steps = [
    {
      icon: <ChartIcon size={48} />,
      title: 'Diversified Portfolio',
      description: 'Your money is automatically invested across top-performing stocks and ETFs',
    },
    {
      icon: <AIIcon size={48} />,
      title: 'AI-Powered Management',
      description:
        'Our advanced algorithms continuously optimize your portfolio for maximum returns',
    },
    {
      icon: <TrackingIcon size={48} />,
      title: 'Real-Time Tracking',
      description: 'Monitor your investments and watch your money grow with live updates',
    },
    {
      icon: <FractionalIcon size={48} />,
      title: 'Fractional Investing',
      description: 'Own pieces of expensive stocks with any amount, starting from just $1',
    },
  ];

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const stepsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: stepsOpacity.value,
    transform: [{ translateY: stepsTranslateY.value }],
  }));

  const securityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: securityOpacity.value,
    transform: [{ translateY: securityTranslateY.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progressOpacity.value,
  }));

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      {/* Progress Indicator */}
      <Animated.View
        style={[
          { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md },
          progressAnimatedStyle,
        ]}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                index === currentStep ? colors.primary.royalBlue : colors.border.secondary,
              marginHorizontal: 4,
            }}
          />
        ))}
      </Animated.View>

      {/* Skip Button */}
      <Animated.View
        style={[{ alignItems: 'flex-end', marginTop: spacing.md }, progressAnimatedStyle]}>
        <Button title="Skip" variant="tertiary" size="small" onPress={onSkip} />
      </Animated.View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: spacing.lg }}
        showsVerticalScrollIndicator={false}>
        {/* Animated Title */}
        <Animated.Text
          style={[
            {
              fontSize: typography.styles.h1.size,
              fontWeight: typography.weights.bold,
              fontFamily: typography.fonts.primary,
              color: colors.text.primary,
              textAlign: 'center',
              marginBottom: spacing.xl,
            },
            titleAnimatedStyle,
          ]}>
          How STACK Works
        </Animated.Text>

        {/* Animated Steps */}
        <Animated.View style={stepsAnimatedStyle}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: spacing.lg,
                paddingHorizontal: spacing.md,
                opacity: stepsOpacity.value,
                transform: [
                  {
                    translateY: interpolate(stepsTranslateY.value, [30, 0], [30 + index * 10, 0]),
                  },
                ],
              }}>
              {/* Step Icon */}
              <Animated.View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: colors.background.dark,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: spacing.md,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                {step.icon}
              </Animated.View>

              {/* Step Content */}
              <View style={{ flex: 1, paddingTop: spacing.xs }}>
                <Text
                  style={{
                    fontSize: typography.styles.h3.size,
                    fontWeight: typography.weights.semibold,
                    fontFamily: typography.fonts.primary,
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                  }}>
                  {step.title}
                </Text>
                <Text
                  style={{
                    fontSize: typography.styles.body.size,
                    fontFamily: typography.fonts.secondary,
                    color: colors.text.secondary,
                    lineHeight: 20,
                  }}>
                  {step.description}
                </Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Animated Security Note */}
        <Animated.View
          style={[
            {
              backgroundColor: colors.background.dark,
              borderRadius: 12,
              padding: spacing.md,
              marginTop: spacing.lg,
              flexDirection: 'row',
              alignItems: 'center',
            },
            securityAnimatedStyle,
          ]}>
          <View style={{ marginRight: spacing.md }}>
            <SecurityIcon size={32} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: typography.styles.label.size,
                fontWeight: typography.weights.semibold,
                fontFamily: typography.fonts.primary,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}>
              Bank-Level Security
            </Text>
            <Text
              style={{
                fontSize: typography.styles.caption.size,
                fontFamily: typography.fonts.secondary,
                color: colors.text.secondary,
                lineHeight: 16,
              }}>
              Your investments are protected by 256-bit encryption and SIPC insurance up to $500,000
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Animated Bottom Actions */}
      <Animated.View style={[{ paddingBottom: spacing.lg }, buttonsAnimatedStyle]}>
        <Button title="Get Started" variant="primary" size="large" fullWidth onPress={onNext} />
        <Button
          title="Learn More"
          variant="tertiary"
          size="medium"
          fullWidth
          onPress={() => {
            // Could open a web view or navigate to more detailed info
            console.log('Learn more pressed');
          }}
          style={{ marginTop: spacing.md }}
        />
      </Animated.View>
    </View>
  );
};
