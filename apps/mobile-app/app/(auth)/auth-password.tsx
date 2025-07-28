import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, InputField } from '@stack/ui-library';
import { AuthStepLayout } from '../../components/auth/steps/AuthStepLayout';
import { useAuthFlow } from '../../components/auth/steps/AuthFlowContext';

export default function AuthPasswordScreen() {
  const router = useRouter();
  const { data, updateData } = useAuthFlow();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('One number');
    }
    
    return errors;
  };

  const handleContinue = () => {
    setError('');
    
    if (!data.password) {
      setError('Please enter a password');
      return;
    }
    
    const validationErrors = validatePassword(data.password);
    if (validationErrors.length > 0) {
      setError(`Password must have: ${validationErrors.join(', ')}`);
      return;
    }

    router.push('/auth-name' as any);
  };

  const handlePasswordChange = (value: string) => {
    updateData('password', value);
    if (error) setError('');
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: data.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(data.password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(data.password) },
    { text: 'One number', met: /\d/.test(data.password) }
  ];

  return (
    <AuthStepLayout
      title="Create a password"
      subtitle="Choose a strong password to keep your account secure"
      currentStep={3}
      totalSteps={6}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between">
          <View className="space-y-6">
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={data.password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="new-password"
              autoFocus
              error={error}
              required
            />
            
            {/* Password Requirements */}
            <View className="space-y-3">
              <Text className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Gilroy' }}>
                Password requirements:
              </Text>
              {passwordRequirements.map((req, index) => (
                <View key={index} className="flex-row items-center space-x-2">
                  <View className={`h-4 w-4 rounded-full items-center justify-center ${
                    req.met ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {req.met && <Text className="text-white text-xs">✓</Text>}
                  </View>
                  <Text className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`} 
                        style={{ fontFamily: 'Gilroy' }}>
                    {req.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="pb-8">
            <Button
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
              disabled={!data.password || validatePassword(data.password).length > 0}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthStepLayout>
  );
}