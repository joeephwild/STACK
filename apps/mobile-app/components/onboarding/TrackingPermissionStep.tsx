import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@stack/ui-library';
import { OnboardingStepProps } from './types';
import { gear } from '~/assets/images';

export function TrackingPermissionStep({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}: OnboardingStepProps) {
  const handleContinue = () => {
    // For now, just proceed to next step
    // In a real app, you would request tracking permissions here
    onNext();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6">

        {/* Content */}
        <View className="flex-1 items-center justify-center px-4">
          <Image
            source={gear}
            className="mb-8 h-[240px] w-[240px]"
            resizeMode="cover"
          />

          <Text className="mb-6 text-center text-[48px] font-h1 font-bold text-gray-900">
            Help us lower prices
          </Text>

          <Text className="mb-8 px-4 text-center text-base leading-6 text-gray-600">
            We need your permission to see if you browse other apps where we run ads. This helps us
            make our ads more efficient, so we can pass cost savings on to you.
          </Text>
        </View>

        {/* Buttons */}
        <View className="pb-8">
          <View className="mb-4">
            <Button title="Continue" onPress={handleContinue} variant='accent' />
          </View>

          <Button title="Decide later" onPress={onSkip} variant="tertiary" />
        </View>
      </View>
    </SafeAreaView>
  );
}
