import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@stack/ui-library';
import { OnboardingStepProps } from './types';
import { checkmark } from '~/assets/images';

export function CompletionStep({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}: OnboardingStepProps) {
  return (
    <SafeAreaView className="flex-1 bg-green-600">
      <View className="flex-1 px-6 justify-between">

        {/* Content */}
        <View className="flex-1 justify-center items-center px-4">
          <Image
             source={checkmark}
             className="w-[240px] h-[240px] mb-8"
             resizeMode="contain"
           />

          <Text className="text-[48px] font-h1 font-bold text-center text-white mb-4">
            ALL DONE!
          </Text>

          <Text className="text-lg text-center font-heading-light text-white mb-8 opacity-90">
            You&apos;re ready to start using your balances.
          </Text>
        </View>

        {/* Button */}
        <View className="pb-8">
          <Button
            title="Done"
            onPress={onNext}
            variant="accent"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
