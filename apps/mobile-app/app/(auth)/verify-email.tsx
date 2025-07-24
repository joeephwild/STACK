import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

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

    try {
      await verifyEmail({ token: verificationCode.trim() });
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
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
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Verify Your Email
        </Text>
        <Text className="text-gray-600 text-base leading-6">
          We've sent a verification code to{'\n'}
          <Text className="font-semibold text-gray-900">{email}</Text>
        </Text>
      </View>

      {/* Verification Code Input */}
      <View className="mb-6">
        <Text className="text-gray-700 font-medium mb-2">
          Verification Code
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-white"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
          maxLength={6}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Error Message */}
      {error && (
        <View className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <Text className="text-red-600 text-sm">{error}</Text>
        </View>
      )}

      {/* Verify Button */}
      <Pressable
        className={`rounded-xl py-4 mb-4 ${
          isLoading || !verificationCode.trim()
            ? 'bg-gray-300'
            : 'bg-blue-600'
        }`}
        onPress={handleVerifyEmail}
        disabled={isLoading || !verificationCode.trim()}
      >
        <Text className="text-white text-center font-semibold text-base">
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Text>
      </Pressable>

      {/* Resend Code */}
      <View className="flex-row justify-center items-center">
        <Text className="text-gray-600 text-sm mr-1">
          Didn't receive the code?
        </Text>
        <Pressable
          onPress={handleResendCode}
          disabled={isResending}
          className="py-2"
        >
          <Text className="text-blue-600 font-medium text-sm">
            {isResending ? 'Sending...' : 'Resend'}
          </Text>
        </Pressable>
      </View>

      {/* Back to Login */}
      <Pressable
        className="mt-8 py-3"
        onPress={() => router.back()}
      >
        <Text className="text-gray-600 text-center text-sm">
          Back to Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
