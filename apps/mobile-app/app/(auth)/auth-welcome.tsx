import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@stack/ui-library';
import { AuthStepLayout } from '../../components/auth/steps/AuthStepLayout';

export default function AuthWelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/auth-email');
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  return (
    <AuthStepLayout
      title="Welcome to STACK"
      subtitle="The future of investing is here. Simple, social, and smart."
      currentStep={1}
      totalSteps={6}
      showBackButton={false}
    >
      <View className="flex-1 justify-between">
        {/* Illustration/Logo Area */}
        <View className="flex-1 items-center justify-center">
          <View className="h-64 w-64 bg-purple-100 rounded-full items-center justify-center mb-8">
            <Text className="text-6xl">🚀</Text>
          </View>
          
          <View className="space-y-4 text-center">
            <Text className="text-lg text-gray-600 text-center px-4" style={{ fontFamily: 'Gilroy' }}>
              Join thousands of Gen Z investors building wealth through smart, automated investing
            </Text>
            
            <View className="flex-row items-center justify-center space-x-2 mt-6">
              <View className="h-2 w-2 bg-purple-500 rounded-full" />
              <Text className="text-sm text-gray-500" style={{ fontFamily: 'Gilroy' }}>
                Free starter investment included
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4 pb-8">
          <Button
            title="Create Account"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            fullWidth
          />
          
          <Button
            title="I already have an account"
            onPress={handleSignIn}
            variant="tertiary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </AuthStepLayout>
  );
}