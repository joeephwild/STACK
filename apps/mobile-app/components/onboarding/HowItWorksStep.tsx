import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import {
  Button,
  FeatureCard,
  Icon,
  colors,
  typography,
  spacing,
  borderRadius,
  Grid,
  GridItem,
} from '@stack/ui-library';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    ]).start();
  }, [fadeAnim, slideAnim]);

  const features = [
    {
      icon: <Icon name="card" library="ionicons" size={32} color={colors.primary.royalBlue} />,
      title: 'Link Your Card',
      description: 'Connect your debit or credit card securely to start rounding up purchases',
    },
    {
      icon: (
        <Icon name="trending-up" library="ionicons" size={32} color={colors.accent.limeGreen} />
      ),
      title: 'Round Up Purchases',
      description: 'Every purchase is rounded up to the nearest dollar and invested automatically',
    },
    {
      icon: <Icon name="pie-chart" library="ionicons" size={32} color={colors.primary.royalBlue} />,
      title: 'Build Your Portfolio',
      description: 'Watch your spare change grow into a diversified investment portfolio',
    },
  ];

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
        {/* Title */}
        <Text style={styles.title}>How STACK Works</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Turn your everyday purchases into investments with just three simple steps
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Grid columns={2}  key={index}>
              <GridItem span={2}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  style={styles.featureCard}
                />
              </GridItem>
            </Grid>
          ))}
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
        <Button title="Skip" variant="tertiary" onPress={onSkip} style={styles.skipButton} />
        <Button title="Continue" variant="primary" onPress={onNext} style={styles.nextButton} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.styles.h1.size,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.styles.body.size,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.styles.body.size * typography.lineHeights.normal,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  featuresContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  featureCard: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    width: '100%',
  },
  skipButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  nextButton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
});
