import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { useNavigation } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { ResetPasswordData } from '../../lib/api';

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
  onBackPress?: () => void;
}

export function ResetPasswordForm({ token, onSuccess, onBackPress }: ResetPasswordFormProps) {
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await resetPassword({
        token,
        password,
        confirmPassword,
      });
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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleClose = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const isFormValid = password && confirmPassword;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
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
              Reset Password
            </Text>

            {/* Description */}
            <Text className="font-body text-body text-text-secondary mb-8">
              Enter your new password below to complete the reset process.
            </Text>

            {/* Password Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                New Password
              </Text>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder=""
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  className={`
                    bg-white
                    border border-text-tertiary
                    rounded-xl
                    px-4 py-4 pr-12
                    font-body text-body text-text-primary
                    ${errors.password ? 'border-semantic-danger' : ''}
                  `}
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Icon 
                    name={showPassword ? "eye-off" : "eye"} 
                    library="ionicons" 
                    size={20} 
                    color="#666666" 
                  />
                </TouchableOpacity>
              </View>

              {errors.password && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Confirm Password Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Confirm New Password
              </Text>

              <View className="relative">
                <TextInput
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder=""
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  className={`
                    bg-white
                    border border-text-tertiary
                    rounded-xl
                    px-4 py-4 pr-12
                    font-body text-body text-text-primary
                    ${errors.confirmPassword ? 'border-semantic-danger' : ''}
                  `}
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                >
                  <Icon 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    library="ionicons" 
                    size={20} 
                    color="#666666" 
                  />
                </TouchableOpacity>
              </View>

              {errors.confirmPassword && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            {/* Password Requirements */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <Text className="font-label text-label text-text-secondary mb-2">
                Password Requirements:
              </Text>
              <View className="space-y-1">
                <Text className="font-caption text-caption text-text-secondary">
                  • At least 8 characters long
                </Text>
                <Text className="font-caption text-caption text-text-secondary">
                  • Contains uppercase and lowercase letters
                </Text>
                <Text className="font-caption text-caption text-text-secondary">
                  • Contains at least one number
                </Text>
              </View>
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
            title="Reset Password"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading || !isFormValid}
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
