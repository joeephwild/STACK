import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { RegisterData } from '../lib/api';

interface RegistrationFormProps {
  onRegistrationSuccess?: () => void;
  onCancel?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegistrationSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, error: authError, clearError } = useAuthStore();

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError();
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      clearError();

      // Basic validation
      if (!formData.email && !formData.username) {
        Alert.alert('Validation Error', 'Please provide either an email or username');
        return;
      }

      if (formData.email && !isValidEmail(formData.email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address');
        return;
      }

      await register(formData);
      onRegistrationSuccess?.();
      Alert.alert('Success', 'Registration completed successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Complete Your Profile
        </Text>
        <Text className="text-gray-600 mb-6 text-center">
          Add some details to personalize your account
        </Text>

        {authError && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-800 text-sm">{authError}</Text>
          </View>
        )}

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Username
            </Text>
            <TextInput
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Choose a username"
              autoCapitalize="none"
              autoCorrect={false}
              className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              First Name
            </Text>
            <TextInput
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="Enter your first name"
              autoCapitalize="words"
              className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Last Name
            </Text>
            <TextInput
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="Enter your last name"
              autoCapitalize="words"
              className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white"
            />
          </View>
        </View>

        <View className="mt-8 space-y-3">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            className={`py-4 px-6 rounded-lg ${
              isSubmitting
                ? 'bg-gray-400'
                : 'bg-blue-500'
            }`}
          >
            {isSubmitting ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-medium ml-2">
                  Completing Registration...
                </Text>
              </View>
            ) : (
              <Text className="text-white text-center font-medium text-lg">
                Complete Registration
              </Text>
            )}
          </TouchableOpacity>

          {onCancel && (
            <TouchableOpacity
              onPress={onCancel}
              disabled={isSubmitting}
              className="py-4 px-6 rounded-lg border border-gray-300"
            >
              <Text className="text-gray-700 text-center font-medium text-lg">
                Skip for Now
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text className="text-xs text-gray-500 mt-6 text-center">
          You can update this information later in your profile settings
        </Text>
      </View>
    </ScrollView>
  );
};
