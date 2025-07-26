import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface PersonalInfoStepProps {
  onNext: (data: { displayName: string }) => void;
  onBack?: () => void;
  initialData?: { displayName?: string };
}

export function PersonalInfoStep({ onNext, onBack, initialData }: PersonalInfoStepProps) {
  const [displayName, setDisplayName] = useState(initialData?.displayName || '');
  const [errors, setErrors] = useState<{ displayName?: string }>({});
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (displayName.trim().length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        displayName: displayName.trim(),
      });
    }
  };

  const handleDisplayNameChange = (value: string) => {
    setDisplayName(value);
    if (errors.displayName) {
      setErrors(prev => ({ ...prev, displayName: undefined }));
    }
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

  const isFormValid = displayName.trim();

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
              Tell us about yourself
            </Text>

            {/* Display Name Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Display Name
              </Text>

              <TextInput
                value={displayName}
                onChangeText={handleDisplayNameChange}
                placeholder=""
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect={false}
                className={`
                  bg-white
                  border border-text-tertiary
                  rounded-xl
                  px-4 py-4
                  font-body text-body text-text-primary
                  ${errors.displayName ? 'border-semantic-danger' : ''}
                `}
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                }}
              />

              {errors.displayName && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {errors.displayName}
                </Text>
              )}
            </View>



            {/* Info Note */}
            <View className="bg-gray-50 rounded-xl p-4 mb-8">
              <Text className="font-caption text-caption text-text-secondary leading-5">
                💡 Your personal information is encrypted and secure. We use this information to verify your identity and comply with financial regulations.
              </Text>
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
            disabled={!isFormValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}