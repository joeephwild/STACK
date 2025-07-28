import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, PhoneNumberInput } from '@stack/ui-library';
import { AuthStepLayout } from '../../components/auth/steps/AuthStepLayout';
import { useAuthFlow } from '../../components/auth/steps/AuthFlowContext';

export default function AuthPhoneScreen() {
  const router = useRouter();
  const { data, updateData } = useAuthFlow();
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic phone number validation (10 digits for US)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const handleContinue = () => {
    setError('');
    
    if (!data.phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    
    if (!validatePhoneNumber(data.phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    router.push('/auth-verification' as any);
  };

  const handlePhoneChange = (value: string) => {
    updateData('phoneNumber', value);
    if (error) setError('');
  };

  const handleCountryCodeChange = (value: string) => {
    updateData('countryCode', value);
  };

  return (
    <AuthStepLayout
      title="What&apos;s your phone number?"
      subtitle="We&apos;ll send you a verification code to confirm it&apos;s really you"
      currentStep={5}
      totalSteps={6}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between">
          <View className="space-y-6">
            <PhoneNumberInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={data.phoneNumber}
              onChangeText={handlePhoneChange}
              countryCode={data.countryCode}
              onCountryCodeChange={handleCountryCodeChange}
              autoFocus
              error={error}
              required
            />
            
            <View className="bg-green-50 p-4 rounded-lg">
              <Text className="text-sm text-green-700" style={{ fontFamily: 'Gilroy' }}>
                📱 We&apos;ll only use this for account security and important notifications
              </Text>
            </View>
            
            <View className="space-y-2">
              <Text className="text-xs text-gray-500" style={{ fontFamily: 'Gilroy' }}>
                By continuing, you agree to receive SMS messages from STACK. Message and data rates may apply.
              </Text>
            </View>
          </View>

          <View className="pb-8">
            <Button
              title="Send Verification Code"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
              disabled={!data.phoneNumber}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthStepLayout>
  );
}