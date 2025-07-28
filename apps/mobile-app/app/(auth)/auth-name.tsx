import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, InputField } from '@stack/ui-library';
import { AuthStepLayout } from '../../components/auth/steps/AuthStepLayout';
import { useAuthFlow } from '../../components/auth/steps/AuthFlowContext';

export default function AuthNameScreen() {
  const router = useRouter();
  const { data, updateData } = useAuthFlow();
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handleContinue = () => {
    const newErrors: { firstName?: string; lastName?: string } = {};
    
    if (!data.firstName || !validateName(data.firstName)) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!data.lastName || !validateName(data.lastName)) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      router.push('/auth-phone' as any);
    }
  };

  const handleFirstNameChange = (value: string) => {
    updateData('firstName', value);
    if (errors.firstName) {
      setErrors(prev => ({ ...prev, firstName: undefined }));
    }
  };

  const handleLastNameChange = (value: string) => {
    updateData('lastName', value);
    if (errors.lastName) {
      setErrors(prev => ({ ...prev, lastName: undefined }));
    }
  };

  return (
    <AuthStepLayout
      title="What&apos;s your name?"
      subtitle="This helps us personalize your experience and verify your identity"
      currentStep={4}
      totalSteps={6}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between">
          <View className="space-y-4">
            <InputField
              label="First Name"
              placeholder="Enter your first name"
              value={data.firstName}
              onChangeText={handleFirstNameChange}
              autoCapitalize="words"
              autoComplete="given-name"
              autoFocus
              error={errors.firstName}
              required
            />
            
            <InputField
              label="Last Name"
              placeholder="Enter your last name"
              value={data.lastName}
              onChangeText={handleLastNameChange}
              autoCapitalize="words"
              autoComplete="family-name"
              error={errors.lastName}
              required
            />
            
            <View className="bg-purple-50 p-4 rounded-lg">
              <Text className="text-sm text-purple-700" style={{ fontFamily: 'Gilroy' }}>
                🔒 Your personal information is encrypted and secure
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
              disabled={!data.firstName || !data.lastName}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthStepLayout>
  );
}