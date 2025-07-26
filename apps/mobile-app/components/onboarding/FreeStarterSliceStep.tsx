import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { Button, colors, typography, spacing } from '@stack/ui-library';
import { useAuthStore } from '../../store/authStore';
import { GiftIcon } from '../icons/OnboardingIcons';

interface FreeStarterSliceStepProps {
  onNext: () => void;
  onSkip: () => void;
  onAcceptStarterSlice?: () => void;
  isLoading?: boolean;
  currentStep: number;
  totalSteps: number;
}

export const FreeStarterSliceStep: React.FC<FreeStarterSliceStepProps> = ({
  onNext,
  onSkip,
  onAcceptStarterSlice,
  isLoading = false,
  currentStep,
  totalSteps,
}) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const { user } = useAuthStore();

  // Animation values
  const iconScale = useSharedValue(0);
  const iconBounce = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const descriptionOpacity = useSharedValue(0);
  const descriptionTranslateY = useSharedValue(30);
  const benefitsOpacity = useSharedValue(0);
  const benefitsTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);
  const progressOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animation sequence
    iconScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 100 }));

    // Continuous bounce animation for the gift icon
    const bounceAnimation = () => {
      iconBounce.value = withSequence(
        withTiming(1, { duration: 1000 }),
        withSpring(0, { damping: 8, stiffness: 100 }),
        withDelay(2000, withTiming(0, { duration: 0 }))
      );
    };

    setTimeout(() => {
      bounceAnimation();
      const interval = setInterval(bounceAnimation, 4000);
      return () => clearInterval(interval);
    }, 800);

    titleOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(500, withSpring(0, { damping: 20, stiffness: 90 }));

    descriptionOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    descriptionTranslateY.value = withDelay(700, withSpring(0, { damping: 20, stiffness: 90 }));

    benefitsOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    benefitsTranslateY.value = withDelay(900, withSpring(0, { damping: 20, stiffness: 90 }));

    buttonsOpacity.value = withDelay(1100, withTiming(1, { duration: 600 }));
    buttonsTranslateY.value = withDelay(1100, withSpring(0, { damping: 20, stiffness: 90 }));

    progressOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
  }, []);

  const handleAcceptStarterSlice = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to continue');
      return;
    }

    setIsAccepting(true);
    try {
      // Call the onboarding API to create wallet and starter investment
      const response = await fetch('/api/onboarding/starter-investment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          userId: user.id,
          amount: 10, // $10 starter slice
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - wallet created and starter investment made
        Alert.alert(
          'Success!',
          'Your wallet has been created and your free $10 starter slice has been invested!',
          [{ text: 'Continue', onPress: onNext }]
        );
      } else {
        throw new Error(data.message || 'Failed to create starter investment');
      }
    } catch (error) {
      console.error('Error creating starter slice:', error);
      Alert.alert('Error', 'Failed to create your starter slice. Please try again.', [
        { text: 'OK' },
      ]);
    } finally {
      setIsAccepting(false);
    }
  };

  // Animated styles
  const iconAnimatedStyle = useAnimatedStyle(() => {
    const bounceTranslateY = interpolate(iconBounce.value, [0, 1], [0, -10]);
    return {
      transform: [{ scale: iconScale.value }, { translateY: bounceTranslateY }],
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
    transform: [{ translateY: descriptionTranslateY.value }],
  }));

  const benefitsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefitsOpacity.value,
    transform: [{ translateY: benefitsTranslateY.value }],
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
        <Button
          title="Skip"
          variant="tertiary"
          size="small"
          onPress={onSkip}
          disabled={isAccepting}
        />
      </Animated.View>

      {/* Main Content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Animated Gift Icon */}
        <Animated.View style={[{ marginBottom: spacing.xl }, iconAnimatedStyle]}>
          <GiftIcon size={120} />
        </Animated.View>

        {/* Animated Title */}
        <Animated.Text
          style={[
            {
              fontSize: typography.styles.h1.size,
              fontWeight: typography.weights.bold,
              fontFamily: typography.fonts.secondary,
              color: colors.text.primary,
              textAlign: 'center',
              marginBottom: spacing.md,
            },
            titleAnimatedStyle,
          ]}>
          Free $10 Starter Slice
        </Animated.Text>

        {/* Animated Description */}
        <Animated.Text
          style={[
            {
              fontSize: typography.styles.body.size,
              fontFamily: typography.fonts.secondary,
              color: colors.text.secondary,
              textAlign: 'center',
              lineHeight: 24,
              paddingHorizontal: spacing.lg,
              marginBottom: spacing.lg,
            },
            descriptionAnimatedStyle,
          ]}>
          Get started with a free $10 investment in our diversified portfolio. No strings attached -
          it&apos;s our gift to help you begin your investing journey.
        </Animated.Text>

        {/* Animated Benefits List */}
        <Animated.View
          style={[{ alignSelf: 'stretch', paddingHorizontal: spacing.lg }, benefitsAnimatedStyle]}>
          {[
            'Instant diversification across top stocks',
            'Professional portfolio management',
            'Real-time performance tracking',
            'No fees on your starter slice',
          ].map((benefit, index) => (
            <Animated.View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.sm,
                opacity: benefitsOpacity.value,
                transform: [{ translateY: benefitsTranslateY.value }],
              }}>
              <Text
                style={{ color: colors.accent.limeGreen, marginRight: spacing.sm, fontSize: 16 }}>
                ✓
              </Text>
              <Text
                style={{
                  fontSize: typography.styles.label.size,
                  fontFamily: typography.fonts.secondary,
                  color: colors.text.secondary,
                  flex: 1,
                }}>
                {benefit}
              </Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>

      {/* Animated Bottom Actions */}
      <Animated.View style={[{ paddingBottom: spacing.lg }, buttonsAnimatedStyle]}>
        <Button
          title={isAccepting ? 'Creating Your Wallet...' : 'Claim My $10'}
          variant="accent"
          size="large"
          fullWidth
          loading={isAccepting}
          onPress={handleAcceptStarterSlice}
          disabled={isAccepting}
        />
        <Button
          title="Maybe Later"
          variant="tertiary"
          size="medium"
          fullWidth
          onPress={onNext}
          disabled={isAccepting}
          style={{ marginTop: spacing.md }}
        />
      </Animated.View>
    </View>
  );
};
