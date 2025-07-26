import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Button, Icon, colors } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface EmailStepProps {
  onNext: (data: { email: string }) => void;
  onBack?: () => void;
  initialData?: { email?: string };
}

export function EmailStep({ onNext, onBack, initialData }: EmailStepProps) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onNext({ email: email.trim() });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  const handleClose = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
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
              Enter your email address
            </Text>

            {/* Email Input Section */}
            <View className="mb-8">
              <Text className="font-label text-label text-text-secondary mb-3">
                Your email
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
                  ${error ? 'border-semantic-danger' : ''}
                `}
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                }}
              />

              {error && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {error}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="pb-6">
          {/* Terms and Privacy */}
          <View className="mb-6">
            <Text className="font-caption  text-text-secondary text-center leading-5">
              By registering, you accept our{' '}
              <Text className="text-text-primary underline">Terms of Use</Text>
              {' '}and{' '}
              <Text className="text-text-primary underline">Privacy Policy</Text>.
            </Text>
          </View>

          {/* Continue Button */}
          <Button
            title="Continue"
            variant="accent"
            fullWidth
            onPress={handleNext}
            disabled={!email.trim()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
