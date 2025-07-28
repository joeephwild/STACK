import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@stack/ui-library';
import { ProgressBar } from '@stack/ui-library';

interface AuthStepLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function AuthStepLayout({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
  showBackButton = true,
  onBack
}: AuthStepLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header with back button and progress */}
        <View className="flex-row items-center justify-between pt-4 pb-6">
          {showBackButton ? (
            <Pressable
              onPress={handleBack}
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="chevron-back" size={20} color="#000" />
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}
          
          <View className="flex-1 mx-4">
            <ProgressBar 
              progress={progress} 
              height={4}
              backgroundColor="#EAE2FF"
              progressColor="#5852FF"
            />
          </View>
          
          <Text className="text-sm font-medium text-gray-500">
            {currentStep}/{totalSteps}
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title Section */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'MD Nichrome' }}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-base text-gray-600" style={{ fontFamily: 'Gilroy' }}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Step Content */}
          <View className="flex-1">
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}