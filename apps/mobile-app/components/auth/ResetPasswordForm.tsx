import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { InputField } from '../../../../packages/ui-library/src/components/atoms/InputField';
import { Button } from '../../../../packages/ui-library/src/components/atoms/Button';
import { useAuthStore } from '../../store/authStore';
import { ResetPasswordData } from '../../lib/api';
import { Ionicons } from '@expo/vector-icons';

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
  onBackPress?: () => void;
}

export function ResetPasswordForm({ token, onSuccess, onBackPress }: ResetPasswordFormProps) {
  const { resetPassword, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<ResetPasswordData>({
    token,
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      const response = await resetPassword(formData);
      if (response.success) {
        Alert.alert(
          'Password Reset Successful',
          'Your password has been successfully reset. You can now sign in with your new password.',
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
      console.error('Reset password failed:', err);
    }
  };

  const updateFormData = (field: keyof ResetPasswordData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

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
          <Text className="font-heading text-h1 font-bold text-text-primary">Reset Password</Text>
          <Text className="font-heading-regular text-base text-text-secondary">
            Enter your new password below to complete the reset process.
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mt-8 gap-y-4">
          <InputField
            label="New Password"
            placeholder="Enter your new password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={formErrors.password}
            required
          />

          <InputField
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry
            error={formErrors.confirmPassword}
            required
          />
        </View>

        {/* Password Requirements */}
        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="font-heading-medium mb-2 text-sm text-text-secondary">
            Password Requirements:
          </Text>
          <View className="space-y-1">
            <Text className="font-heading-regular text-xs text-text-secondary">
              • At least 8 characters long
            </Text>
            <Text className="font-heading-regular text-xs text-text-secondary">
              • Contains uppercase and lowercase letters
            </Text>
            <Text className="font-heading-regular text-xs text-text-secondary">
              • Contains at least one number
            </Text>
          </View>
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-error-light border-error rounded-lg border p-4">
            <Text className="text-error font-heading-bold text-sm">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <Button
          title="Reset Password"
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
