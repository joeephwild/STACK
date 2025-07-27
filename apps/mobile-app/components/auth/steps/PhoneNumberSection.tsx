import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { PhoneNumberInput } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface PhoneNumberSectionProps {
  onNext: (data: { phoneNumber: string }) => void;
  onBack?: () => void;
  initialData?: { phoneNumber?: string };
  defaultCountry?: string;
}

export function PhoneNumberSection({
  onNext,
  onBack,
  initialData,
  defaultCountry = "US"
}: PhoneNumberSectionProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || '');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic phone number validation - should start with country code and have reasonable length
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone) && phone.length >= 8;
  };

  const handleNext = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setError('');
    onNext({ phoneNumber: phoneNumber.trim() });
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (error) setError('');
  };

  const handleClose = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const handleHelp = () => {
    // TODO: Implement help functionality
    console.log('Help button pressed');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* Header with Close and Help Buttons */}
        <View className="flex-row justify-between items-center pt-4 pb-8">
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 items-center justify-center"
          >
            <Icon name="close" library="ionicons" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleHelp}
            className="w-8 h-8 items-center justify-center"
          >
            <Icon name="help-circle" library="ionicons" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            {/* Title */}
            <Text className="font-h1 text-h1 text-text-primary mb-8">
              Enter your phone number
            </Text>

            {/* Phone Number Input Section */}
            <View className="mb-8">
              <Text className="font-label text-label text-text-secondary mb-3">
                Phone Number
              </Text>

              <PhoneNumberInput
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                error={error}
                required
                defaultCountry={defaultCountry}
                placeholder="Enter your phone number"
              />
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
            disabled={!phoneNumber.trim()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
