import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { useNavigation } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { ForgotPasswordData } from '../../lib/api';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackPress?: () => void;
}

export function ForgotPasswordForm({ onSuccess, onBackPress }: ForgotPasswordFormProps) {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    clearError();

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');

    try {
      const response = await forgotPassword({ email: email.trim() });
      if (response.success) {
        setIsEmailSent(true);
        Alert.alert(
          'Email Sent',
          "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
          [
            {
              text: 'OK',
              onPress: () => onSuccess?.(),
            },
          ]
        );
      }
    } catch (err) {
      // Error is handled by the store
      console.error('Forgot password failed:', err);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError('');
  };

  const handleClose = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  if (isEmailSent) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          {/* Header with Close Button */}
          <View className="flex-row justify-between items-center pt-4 pb-8">
            <TouchableOpacity
              onPress={handleClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Icon name="close" library="ionicons" size={24} color="#000000" />
            </TouchableOpacity>
            <View className="flex-1" />
          </View>

          {/* Main Content */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex-1">
              {/* Success Icon */}
              <View className="mb-8 items-center">
                <View className="bg-accent-light mb-4 h-20 w-20 items-center justify-center rounded-full">
                  <Icon name="mail-outline" library="ionicons" size={40} color="#84CC16" />
                </View>
              </View>

              {/* Title */}
              <Text className="font-h1 text-h1 text-text-primary mb-8 text-center">
                Check Your Email
              </Text>

              {/* Description */}
              <Text className="font-body text-body text-text-secondary text-center mb-8">
                We&apos;ve sent a password reset link to {email}
              </Text>

              {/* Info Note */}
              <View className="bg-gray-50 rounded-xl p-4 mb-8">
                <Text className="font-caption text-caption text-text-secondary text-center leading-5">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Section */}
          <View className="pb-6 space-y-3">
            <Button
              title="Resend Email"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              variant="accent"
              fullWidth
            />

            <Button
              title="Back to Sign In"
              onPress={handleClose}
              variant="tertiary"
              fullWidth
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 px-4">
        {/* Header with Close Button */}
        <View className="flex-row justify-between items-center pt-4 pb-8">
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 items-center justify-center"
          >
            <Icon name="close" library="ionicons" size={24} color="#000000" />
          </TouchableOpacity>
          <View className="flex-1" />
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            {/* Title */}
            <Text className="font-h1 text-h1 text-text-primary mb-8">
              Forgot Password?
            </Text>

            {/* Description */}
            <Text className="font-body text-body text-text-secondary mb-8">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </Text>

            {/* Email Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Email Address
              </Text>

              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                className={`
                  bg-white
                  border border-text-tertiary
                  rounded-xl
                  px-4 py-4
                  font-body text-body text-text-primary
                  ${emailError ? 'border-semantic-danger' : ''}
                `}
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                }}
              />

              {emailError && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {emailError}
                </Text>
              )}
            </View>

            {/* Error Display */}
            {error && (
              <View className="bg-error-light border-error rounded-lg border p-4 mb-6">
                <Text className="text-error font-heading-bold text-sm">{error}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="pb-6">
          {/* Submit Button */}
          <Button
            title="Send Reset Link"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading || !email.trim()}
            variant="accent"
            fullWidth
          />

          {/* Footer */}
          <View className="mt-6 flex-row items-center justify-center space-x-1">
            <Text className="font-caption text-caption text-text-secondary">Remember your password?</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text className="font-caption text-caption text-primary underline">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
