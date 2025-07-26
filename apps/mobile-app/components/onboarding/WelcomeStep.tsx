import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Button, Icon, colors, typography, spacing, borderRadius } from '@stack/ui-library';

interface WelcomeStepProps {
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(iconScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, iconScaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Logo/Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: iconScaleAnim }],
            },
          ]}>
          <Icon name="wallet" library="ionicons" size={80} color={colors.primary.royalBlue} />
        </Animated.View>

        {/* Title */}
        <Text style={styles.title} className='font-heading'>Welcome to STACK</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Turn your spare change into investments with every purchase
        </Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[styles.progressDot, index === currentStep - 1 && styles.progressDotActive]}
            />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Skip" variant="tertiary" onPress={onSkip} style={styles.skipButton} />
        <Button title="Get Started" variant="primary" onPress={onNext} style={styles.nextButton} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    position: 'relative',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: 120, // Reserve space for buttons
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    // fontFamily: typography.fonts.primary,
    fontSize: typography.styles.h1.size,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.styles.body.size,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.styles.body.size * typography.lineHeights.normal,
    marginBottom: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  progressDot: {
    height: 8,
    width: 32,
    marginHorizontal: 4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.light,
  },
  progressDotActive: {
    backgroundColor: colors.primary.royalBlue,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl * 2,
    paddingTop: spacing.lg,
    backgroundColor: colors.background.main,
  },
  skipButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  nextButton: {
    flex: 1,
    marginLeft: spacing.md,
  },
});
