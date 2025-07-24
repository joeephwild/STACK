import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { InputField } from '../../../../packages/ui-library/src/components/atoms/InputField';
import { Button } from '../../../../packages/ui-library/src/components/atoms/Button';
import { CountryPicker } from '../../../../packages/ui-library/src/components/atoms/CountryPicker';
import { PhoneNumberInput } from '../../../../packages/ui-library/src/components/atoms/PhoneNumberInput';
import { useAuthStore } from '../../store/authStore';
import type { EmailSignupData } from '../../lib/api';

interface SignupFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SignupForm({ onSuccess, onCancel }: SignupFormProps) {
  const { signupWithEmail, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState<EmailSignupData>({
    email: '',
    password: '',
    displayName: '',
    phoneNumber: '',
    nationality: '',
    referralCode: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCountryCode, setSelectedCountryCode] = useState('US'); // Track country for phone number

  // Helper function to map country names to ISO codes
  const getCountryCodeFromName = (countryName: string): string => {
    const countryMap: Record<string, string> = {
      'United States': 'US',
      'United Kingdom': 'GB',
      Canada: 'CA',
      Australia: 'AU',
      Germany: 'DE',
      France: 'FR',
      Italy: 'IT',
      Spain: 'ES',
      Netherlands: 'NL',
      Sweden: 'SE',
      Norway: 'NO',
      Denmark: 'DK',
      Finland: 'FI',
      Switzerland: 'CH',
      Austria: 'AT',
      Belgium: 'BE',
      Ireland: 'IE',
      Portugal: 'PT',
      Greece: 'GR',
      Poland: 'PL',
      'Czech Republic': 'CZ',
      Hungary: 'HU',
      Slovakia: 'SK',
      Slovenia: 'SI',
      Croatia: 'HR',
      Romania: 'RO',
      Bulgaria: 'BG',
      Lithuania: 'LT',
      Latvia: 'LV',
      Estonia: 'EE',
      Luxembourg: 'LU',
      Malta: 'MT',
      Cyprus: 'CY',
      Japan: 'JP',
      'South Korea': 'KR',
      China: 'CN',
      India: 'IN',
      Singapore: 'SG',
      'Hong Kong': 'HK',
      Taiwan: 'TW',
      Malaysia: 'MY',
      Thailand: 'TH',
      Indonesia: 'ID',
      Philippines: 'PH',
      Vietnam: 'VN',
      Brazil: 'BR',
      Mexico: 'MX',
      Argentina: 'AR',
      Chile: 'CL',
      Colombia: 'CO',
      Peru: 'PE',
      Uruguay: 'UY',
      'South Africa': 'ZA',
      Nigeria: 'NG',
      Kenya: 'KE',
      Egypt: 'EG',
      Morocco: 'MA',
      Israel: 'IL',
      'United Arab Emirates': 'AE',
      'Saudi Arabia': 'SA',
      Turkey: 'TR',
      Russia: 'RU',
      Ukraine: 'UA',
      'New Zealand': 'NZ',
    };
    return countryMap[countryName] || 'US';
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Display name validation
    if (!formData.displayName) {
      errors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      errors.displayName = 'Display name must be at least 2 characters';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)
    ) {
      errors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      errors.phoneNumber = 'Please enter a valid international phone number';
    }

    // Nationality validation
    if (!formData.nationality) {
      errors.nationality = 'Nationality is required';
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
      await signupWithEmail(formData);
      Alert.alert('Account Created!', 'Please check your email for a verification code.', [
        {
          text: 'OK',
          onPress: () => router.push('/(auth)/verify-email'),
        },
      ]);
    } catch (err: any) {
      // Error is handled by the store
      console.error('Registration failed:', err.message);
    }
  };

  const updateFormData = (field: keyof EmailSignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-8" showsVerticalScrollIndicator={false}>
      <View className="space-y-6">
        {/* Header */}
        <View className="gap-y-2">
          <Text className="font-heading text-h1 font-bold text-text-primary">Create Account</Text>
          <Text className="font-heading-bold text-base text-text-secondary">
            Join us and start your journey today
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
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
            label="Display Name"
            placeholder="Enter your display name"
            value={formData.displayName}
            onChangeText={(value) => updateFormData('displayName', value)}
            autoCapitalize="words"
            error={formErrors.displayName}
            required
          />

          <PhoneNumberInput
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            selectedCountryCode={selectedCountryCode}
            onCountryCodeChange={setSelectedCountryCode}
            placeholder="Enter your phone number"
            error={formErrors.phoneNumber}
          />

          <CountryPicker
            label="Nationality"
            placeholder="Select your country"
            value={formData.nationality}
            onSelect={(country) => {
              updateFormData('nationality', country.name);
              // Update phone number country code to match selected nationality
              setSelectedCountryCode(getCountryCodeFromName(country.name));
            }}
            error={formErrors.nationality}
            required
          />

          <InputField
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={formErrors.password}
            required
          />

          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              if (formErrors.confirmPassword) {
                setFormErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }
            }}
            secureTextEntry
            error={formErrors.confirmPassword}
            required
          />

          <InputField
            label="Referral Code (Optional)"
            placeholder="Enter referral code"
            value={formData.referralCode || ''}
            onChangeText={(value) => updateFormData('referralCode', value)}
            autoCapitalize="characters"
          />
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-error-light border-error rounded-lg border p-4">
            <Text className="text-error text-sm">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <Button
          title="Create Account"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>

      {/* Footer */}
      <Pressable onPress={onCancel} className="mt-4 flex-row items-center justify-center space-x-1">
        <Text className="font-heading-regular text-text-secondary">Already have an account?</Text>
        <Text className="font-heading-bold text-text-secondary">Sign In</Text>
      </Pressable>
    </ScrollView>
  );
}
