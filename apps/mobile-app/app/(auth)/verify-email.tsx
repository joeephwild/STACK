import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '~/store/authStore';

export default function VerifyEmailScreen() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const { verifyEmail, resendVerification, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError();
  }, [clearError]);

  const handleVerifyEmail = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    // Clear any previous errors before attempting verification
    clearError();

    try {
      const res = await verifyEmail({ token: verificationCode.trim() });
      console.log('res', res);

      // If we get here, verification was successful
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => router.replace('/(auth)/onboarding') },
      ]);
    } catch (error) {
      // The error is already set in the store by the verifyEmail function
      // We don't need to show an additional Alert since the error will be displayed in the UI
      console.log('Verification error:', error);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Email address not found');
      return;
    }

    try {
      setIsResending(true);
      const response = await resendVerification({ email });
      Alert.alert('Success', response.message || 'Verification code sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* Header */}
      <View className="mb-8">
        <Text className="mb-2 text-3xl font-bold text-gray-900">Verify Your Email</Text>
        <Text className="text-base leading-6 text-gray-600">
          We've sent a verification code to{'\n'}
          <Text className="font-semibold text-gray-900">{email}</Text>
        </Text>
      </View>

      {/* Verification Code Input */}
      <View className="mb-6">
        <Text className="mb-2 font-medium text-gray-700">Verification Code</Text>
        <TextInput
          className="rounded-xl border border-gray-300 bg-white px-4 py-4 text-base"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChangeText={(text) => {
            setVerificationCode(text);
            // Clear error when user starts typing
            if (error) {
              clearError();
            }
          }}
          keyboardType="number-pad"
          maxLength={6}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Error Message */}
      {error && (
        <View className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <Text className="text-sm text-red-600">{error}</Text>
        </View>
      )}

      {/* Verify Button */}
      <Pressable
        className={`mb-4 rounded-xl py-4 ${
          isLoading || !verificationCode.trim() ? 'bg-gray-300' : 'bg-blue-600'
        }`}
        // onPress={handleVerifyEmail}
        onPress={() => router.push('/(auth)/onboarding')}
        disabled={isLoading || !verificationCode.trim()}>
        <Text className="text-center text-base font-semibold text-white">
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Text>
      </Pressable>

      {/* Resend Code */}
      <View className="flex-row items-center justify-center">
        <Text className="mr-1 text-sm text-gray-600">Didn't receive the code?</Text>
        <Pressable onPress={handleResendCode} disabled={isResending} className="py-2">
          <Text className="text-sm font-medium text-blue-600">
            {isResending ? 'Sending...' : 'Resend'}
          </Text>
        </Pressable>
      </View>

      {/* Back to Login */}
      <Pressable className="mt-8 py-3" onPress={() => router.back()}>
        <Text className="text-center text-sm text-gray-600">Back to Sign Up</Text>
      </Pressable>
    </View>
  );
}
