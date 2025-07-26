import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@stack/ui-library';
import { FreeStarterSliceStepProps } from './types';
import { onBoard3, stocks } from '../../assets/images';

export function FreeStarterSliceStep({
  onAccept,
  onSkip,
  currentStep,
  totalSteps,
}: FreeStarterSliceStepProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Main content */}
        <View className="flex-1 items-center justify-center">
          {/* Celebration Image */}
          <View className="mb-8">
            <Image source={stocks} className="h-[240px] w-[240px]" resizeMode="cover" />
          </View>

          {/* Congratulations Message */}
          <View className="mb-8 items-center">
            <Text className="mb-4 text-center font-h1 text-[48px] font-bold text-gray-900">
              Congratulations!
            </Text>
            <Text className="mb-4 text-center font-heading text-xl font-semibold">
              You've been rewarded with a $5 basket of stocks!
            </Text>
            <Text className="px-4 text-center font-body text-base leading-6 text-gray-600">
              Welcome to your investment journey! We&apos;ve given you a starter portfolio worth $5
              to help you begin exploring the world of investing. This is your first step towards
              building wealth and financial freedom.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3 pb-6">
          <Button
            title="Claim My $5 Starter Slice"
            onPress={onAccept}
            variant='accent'
            className="w-full rounded-xl bg-blue-600 py-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
