import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { InputField, Button } from '@stack/ui-library';
import { useAuthStore } from '../../store/authStore';
import { LoginData } from '../../lib/api';

interface SigninFormProps {
  onSuccess?: () => void;
  onSignupPress?: () => void;
  onForgotPassword?: () => void;
}

export function SigninForm({ onSuccess, onSignupPress, onForgotPassword }: SigninFormProps) {
  const { loginWithEmail, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await loginWithEmail(formData);
      Alert.alert('Success', 'Welcome back!');
      onSuccess?.();
    } catch (err: any) {
      // Check if the error is related to email verification
      if (
        err?.message?.includes('email not verified') ||
        err?.message?.includes('verify your email') ||
        err?.code === 'EMAIL_NOT_VERIFIED'
      ) {
        const message = err?.message?.includes('verification email has been sent')
          ? 'A new verification email has been sent to your email address. Please check your inbox and verify your email to continue.'
          : 'Please verify your email address to continue.';

        Alert.alert('Email Not Verified', message, [
          {
            text: 'Verify Now',
            onPress: () =>
              router.push(`/(auth)/verify-email?email=${encodeURIComponent(formData.email)}`),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      } else {
        // Error is handled by the store
        console.error('Login failed:', err);
      }
    }
  };

  const updateFormData = (field: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <View className="flex-1">
        {/* Header */}
        <View className="space-y-2">
          <Text className="font-h1 text-h1 font-bold text-text-primary">Welcome Back</Text>
          <Text className="font-heading-bold text-base text-text-secondary">
            Sign in to your account to continue
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mt-4 gap-y-4">
          <InputField
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={formErrors.email}
            required
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={formErrors.password}
            required
          />
        </View>

        {/* Forgot Password */}
        <View className="mb-4 flex-row justify-end">
          <Button
            title="Forgot Password?"
            onPress={onForgotPassword}
            variant="tertiary"
            size="small"
          />
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-error-light border-error rounded-lg border p-4">
            <Text className="text-error font-heading-bold text-sm">{error}</Text>
          </View>
        )}
      </View>

      <View className="gap-y-4">
        {/* Submit Button */}
        <Button
          title="Sign In"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          variant="accent"
          size="large"
          fullWidth
        />

        {/* Footer */}
        <Pressable
          onPress={onSignupPress}
          className="flex-row items-center justify-center space-x-1">
          <Text className="font-heading-regular text-text-secondary">
            Don&apos;t have an account?
          </Text>
          <Text className="font-heading-bold text-text-secondary">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
