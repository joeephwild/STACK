import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, colors, typography, spacing, borderRadius } from '@stack/ui-library';

interface HowItWorksStepProps {
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, onPress }) => (
  <TouchableOpacity style={styles.featureItem} onPress={onPress}>
    <View style={styles.featureIconContainer}>
      <Icon name={icon} library="ionicons" size={24} color={colors.text.primary} />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
    <View style={styles.featureArrow}>
      <Icon name="chevron-forward" library="ionicons" size={20} color={colors.text.secondary} />
    </View>
  </TouchableOpacity>
);

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
      icon: 'send',
      title: 'Send money abroad',
      description: 'Make faster, cheaper money transfers.',
    },
    {
      icon: 'card',
      title: 'Order a card to spend abroad',
      description: 'Spend in multiple currencies.',
    },
    {
      icon: 'home',
      title: 'Get local account details',
      description: 'Receive payments or income.',
    },
    {
      icon: 'wallet',
      title: 'Hold many currencies in one place',
      description: 'Open a balance in 50+ currencies.',
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
      {/* Close Button */}
      <View style={styles.closeContainer}>
        <Button 
          title="×" 
          variant="tertiary" 
          onPress={onSkip}
          style={styles.closeButton}
        />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Title */}
        <Text style={styles.title}>What would you like to do now?</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Don&apos;t worry, you can come back to the other options later.
        </Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onPress={() => {
                // For demo purposes, just continue to next step
                onNext();
              }}
            />
          ))}
        </View>
      </View>

      {/* Skip Button */}
      <View style={styles.skipContainer}>
        <Button 
          title="Decide later" 
          variant="tertiary" 
          onPress={onNext}
          style={styles.skipButton}
        />
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  closeContainer: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  title: {
    fontFamily: typography.fonts.primary,
    fontSize: 28,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: typography.fonts.secondary,
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xl * 2,
    lineHeight: 22,
  },
  featuresContainer: {
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.main,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: typography.fonts.primary,
    fontSize: 16,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: typography.fonts.secondary,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  featureArrow: {
    marginLeft: spacing.sm,
  },
  skipContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  bottomIndicator: {
    height: 4,
    width: 134,
    backgroundColor: colors.text.primary,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
});
