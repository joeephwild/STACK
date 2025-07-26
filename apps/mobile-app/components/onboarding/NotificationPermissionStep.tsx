import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@stack/ui-library';
import { OnboardingStepProps } from './types';
import { bell } from '~/assets/images';

export function NotificationPermissionStep({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}: OnboardingStepProps) {
  const handleRequestPermission = async () => {
    try {
      // For now, just proceed to next step
      // In a real app, you would request notification permissions here
      onNext();
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      onNext();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6">

        {/* Content */}
        <View className="flex-1 items-center justify-center px-4">
          <Image source={bell} className="mb-8 h-[240px] w-[240px]" resizeMode="cover" />

          <Text className="mb-4 text-center font-h1 text-[48px] font-bold text-gray-900">
            TURN ON NOTIFICATIONS!
          </Text>

          <Text className="mb-2 text-center text-base leading-6 text-gray-600">
            When we need to check it&apos;s really you, we&apos;ll use this app for 2-step
            verification. Make it faster by turning on notifications.
          </Text>

          <Text className="mb-8 text-center text-sm text-gray-500">
            You can turn off notifications anytime in Settings.
          </Text>
        </View>

        {/* Buttons */}
        <View className="pb-8">
          <View className="mb-4">
            <Button
              title="Turn on notifications"
              onPress={handleRequestPermission}
              variant='accent'
            />
          </View>

          <Button title="Maybe later" onPress={onSkip} variant="tertiary" />
        </View>
      </View>
    </SafeAreaView>
  );
}
