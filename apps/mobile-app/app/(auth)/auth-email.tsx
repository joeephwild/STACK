import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, InputField } from '@stack/ui-library';
import { AuthStepLayout } from '../../components/auth/steps/AuthStepLayout';
import { useAuthFlow } from '../../components/auth/steps/AuthFlowContext';

export default function AuthEmailScreen() {
  const router = useRouter();
  const { data, updateData } = useAuthFlow();
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    setError('');
    
    if (!data.email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(data.email)) {
      setError('Please enter a valid email address');
      return;
    }

    router.push('/auth-password' as any);
  };

  const handleEmailChange = (value: string) => {
    updateData('email', value);
    if (error) setError('');
  };

  return (
    <AuthStepLayout
      title="What's your email?"
      subtitle="We'll use this to create your account and send you important updates"
      currentStep={2}
      totalSteps={6}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between">
          <View className="space-y-6">
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              value={data.email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoFocus
              error={error}
              required
            />
            
            <View className="bg-blue-50 p-4 rounded-lg">
              <Text className="text-sm text-blue-700" style={{ fontFamily: 'Gilroy' }}>
                💡 We&apos;ll never share your email with third parties
              </Text>
            </View>
          </View>

          <View className="pb-8">
            <Button
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
              disabled={!data.email}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthStepLayout>
  );
}