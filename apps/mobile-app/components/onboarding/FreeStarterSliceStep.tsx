import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Icon, colors, typography, spacing, borderRadius, shadows } from '@stack/ui-library';

interface FreeStarterSliceStepProps {
  onAccept: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

export const FreeStarterSliceStep: React.FC<FreeStarterSliceStepProps> = ({
  onAccept,
  onSkip,
  currentStep,
  totalSteps,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial entrance animation
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

    // Continuous pulse animation for the icon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [fadeAnim, slideAnim, iconScaleAnim, pulseAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
          {/* Icon with pulse animation */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: iconScaleAnim }, { scale: pulseAnim }],
              },
            ]}>
            <View style={styles.iconBackground}>
              <Icon name="gift" library="ionicons" size={80} color={colors.accent.limeGreen} />
            </View>
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Free $25 Starter{'\n'}Slice!</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Get started with a free $25 investment{'\n'}to explore STACK
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Icon
                name="checkmark-circle"
                library="ionicons"
                size={20}
                color={colors.accent.limeGreen}
              />
              <Text style={styles.featureText}>No fees or commitments</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="checkmark-circle"
                library="ionicons"
                size={20}
                color={colors.accent.limeGreen}
              />
              <Text style={styles.featureText}>Real investment returns</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="checkmark-circle"
                library="ionicons"
                size={20}
                color={colors.accent.limeGreen}
              />
              <Text style={styles.featureText}>Learn as you invest</Text>
            </View>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[styles.progressDot, index === currentStep - 1 && styles.progressDotActive]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Maybe Later" 
            variant="tertiary" 
            onPress={onSkip} 
            style={styles.skipButton} 
          />
          <Button
            title="Claim My $25"
            variant="accent"
            onPress={onAccept}
            style={styles.acceptButton}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface.light,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  title: {
    fontFamily: typography.fonts.primary,
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.styles.body.size,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  featuresContainer: {
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  featureText: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.styles.body.size,
    color: colors.text.primary,
    marginLeft: spacing.sm,
    fontWeight: typography.weights.medium,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  skipButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
  },
});
