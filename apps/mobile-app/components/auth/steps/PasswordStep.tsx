import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface PasswordStepProps {
  onNext: (data: { password: string }) => void;
  onBack?: () => void;
  initialData?: { password?: string };
}

export function PasswordStep({ onNext, onBack, initialData }: PasswordStepProps) {
  const [password, setPassword] = useState(initialData?.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      return 'Password must contain uppercase, lowercase, number, and special character';
    }
    return null;
  };

  const handleNext = () => {
    const passwordError = validatePassword(password);
    const confirmError = password !== confirmPassword ? 'Passwords do not match' : null;

    if (passwordError || confirmError) {
      setErrors({
        password: passwordError || undefined,
        confirmPassword: confirmError || undefined,
      });
      return;
    }

    setErrors({});
    onNext({ password });
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
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 6) return { strength: 'Weak', color: 'text-semantic-danger' };
    if (password.length < 8) return { strength: 'Fair', color: 'text-semantic-warning' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return { strength: 'Good', color: 'text-semantic-warning' };
    }
    return { strength: 'Strong', color: 'text-semantic-success' };
  };

  const passwordStrength = getPasswordStrength(password);

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
              Create a secure password
            </Text>

            {/* Password Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Password
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

              {password.length > 0 && (
                <Text className={`font-caption text-caption mt-2 ${passwordStrength.color}`}>
                  Password strength: {passwordStrength.strength}
                </Text>
              )}
            </View>

            {/* Confirm Password Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Confirm Password
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
            <View className="bg-gray-50 rounded-xl p-4 mb-8">
              <Text className="font-label text-label text-text-primary mb-3">
                Password requirements:
              </Text>
              <View className="space-y-1">
                <Text className={`font-caption text-caption ${password.length >= 8 ? 'text-semantic-success' : 'text-text-tertiary'}`}>
                  • At least 8 characters
                </Text>
                <Text className={`font-caption text-caption ${/[A-Z]/.test(password) ? 'text-semantic-success' : 'text-text-tertiary'}`}>
                  • One uppercase letter
                </Text>
                <Text className={`font-caption text-caption ${/[a-z]/.test(password) ? 'text-semantic-success' : 'text-text-tertiary'}`}>
                  • One lowercase letter
                </Text>
                <Text className={`font-caption text-caption ${/\d/.test(password) ? 'text-semantic-success' : 'text-text-tertiary'}`}>
                  • One number
                </Text>
                <Text className={`font-caption text-caption ${/[@$!%*?&]/.test(password) ? 'text-semantic-success' : 'text-text-tertiary'}`}>
                  • One special character (@$!%*?&)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="pb-6">
          {/* Continue Button */}
          <Button
            title="Continue"
            variant="accent"
            fullWidth
            onPress={handleNext}
            disabled={!password || !confirmPassword}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}