import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { Button, colors, typography, spacing } from '@stack/ui-library';
import { WelcomeIcon } from '../icons/OnboardingIcons';

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
  // Animation values
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(-180);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);
  const progressOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animation sequence
    iconScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 100 }));
    iconRotation.value = withDelay(200, withSpring(0, { damping: 20, stiffness: 80 }));

    titleOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(500, withSpring(0, { damping: 20, stiffness: 90 }));

    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    subtitleTranslateY.value = withDelay(800, withSpring(0, { damping: 20, stiffness: 90 }));

    buttonOpacity.value = withDelay(1100, withTiming(1, { duration: 600 }));
    buttonTranslateY.value = withDelay(1100, withSpring(0, { damping: 20, stiffness: 90 }));

    progressOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
  }, []);

  // Animated styles
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }, { rotate: `${iconRotation.value}deg` }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
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
          <Animated.View
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Animated Icon */}
        <Animated.View style={[{ marginBottom: spacing.xl }, iconAnimatedStyle]}>
          <WelcomeIcon size={120} />
        </Animated.View>

        {/* Animated Title */}
        <Animated.Text
          style={[
            {
              fontSize: typography.styles.h1.size,
              fontWeight: typography.weights.bold,
              fontFamily: typography.fonts.primary,
              color: colors.text.primary,
              textAlign: 'center',
              marginBottom: spacing.md,
            },
            titleAnimatedStyle,
          ]}>
          Welcome to STACK
        </Animated.Text>

        {/* Animated Subtitle */}
        <Animated.Text
          style={[
            {
              fontSize: typography.styles.body.size,
              fontFamily: typography.fonts.secondary,
              color: colors.text.secondary,
              textAlign: 'center',
              lineHeight: 24,
              paddingHorizontal: spacing.lg,
            },
            subtitleAnimatedStyle,
          ]}>
          Your gateway to smart investing. Build wealth with fractional shares, expert insights, and
          automated strategies.
        </Animated.Text>
      </View>

      {/* Animated Bottom Action */}
      <Animated.View style={[{ paddingBottom: spacing.lg }, buttonAnimatedStyle]}>
        <Button title="Get Started" variant="primary" size="large" fullWidth onPress={onNext} />
      </Animated.View>
    </View>
  );
};
