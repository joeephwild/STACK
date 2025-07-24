import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { InputField } from '../../../../packages/ui-library/src/components/atoms/InputField';
import { Button } from '../../../../packages/ui-library/src/components/atoms/Button';
import { useAuthStore } from '../../store/authStore';
import { ForgotPasswordData } from '../../lib/api';
import { Ionicons } from '@expo/vector-icons';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackPress?: () => void;
}

export function ForgotPasswordForm({ onSuccess, onBackPress }: ForgotPasswordFormProps) {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
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
      const response = await forgotPassword(formData);
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

  const updateFormData = (field: keyof ForgotPasswordData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isEmailSent) {
    return (
      <View className="flex-1 bg-white px-6 py-8">
        <View className="space-y-6">
          {/* Back Button */}
          <Pressable onPress={onBackPress} className="mb-4 flex-row items-center">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
            <Text className="font-heading-medium ml-2 text-base text-text-primary">
              Back to Sign In
            </Text>
          </Pressable>

          {/* Success Icon */}
          <View className="mb-8 items-center">
            <View className="bg-accent-light mb-4 h-20 w-20 items-center justify-center rounded-full">
              <Ionicons name="mail-outline" size={40} color="#84CC16" />
            </View>
          </View>

          {/* Header */}
          <View className="space-y-2 text-center">
            <Text className="text-center font-heading text-h1 font-bold text-text-primary">
              Check Your Email
            </Text>
            <Text className="text-center font-heading-regular text-base text-text-secondary">
              We've sent a password reset link to {formData.email}
            </Text>
          </View>

          {/* Instructions */}
          <View className="mt-6 rounded-lg bg-gray-50 p-4">
            <Text className="font-heading-medium text-center text-sm text-text-secondary">
              Didn't receive the email? Check your spam folder or try again.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="mt-8 space-y-3">
            <Button
              title="Resend Email"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              variant="accent"
              size="large"
              fullWidth
            />

            <Button
              title="Back to Sign In"
              onPress={onBackPress}
              variant="tertiary"
              size="large"
              fullWidth
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <View className="space-y-6">
        {/* Back Button */}
        <Pressable onPress={onBackPress} className="mb-4 flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
          <Text className="font-heading-medium ml-2 text-base text-text-primary">
            Back to Sign In
          </Text>
        </Pressable>

        {/* Header */}
        <View className="space-y-2">
          <Text className="font-heading text-h1 font-bold text-text-primary">Forgot Password?</Text>
          <Text className="font-heading-regular text-base text-text-secondary">
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mt-8 gap-y-4">
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
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-error-light border-error rounded-lg border p-4">
            <Text className="text-error font-heading-bold text-sm">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <Button
          title="Send Reset Link"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Footer */}
        <View className="mt-6 flex-row items-center justify-center space-x-1">
          <Text className="font-heading-regular text-text-secondary">Remember your password?</Text>
          <Pressable onPress={onBackPress}>
            <Text className="font-heading-bold text-primary">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
