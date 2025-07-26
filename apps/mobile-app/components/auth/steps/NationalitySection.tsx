import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Icon, CountryPicker } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface NationalitySectionProps {
  onNext: (data: { nationality: string }) => void;
  onBack?: () => void;
  initialData?: { nationality?: string };
}

export function NationalitySection({
  onNext,
  onBack,
  initialData
}: NationalitySectionProps) {
  const [nationality, setNationality] = useState(initialData?.nationality || '');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleNext = () => {
    if (!nationality.trim()) {
      setError('Nationality is required');
      return;
    }

    setError('');
    onNext({ nationality: nationality.trim() });
  };

  const handleNationalitySelect = (country: { name: string; code: string }) => {
    setNationality(country.name);
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
              Select your nationality
            </Text>

            {/* Nationality Input Section */}
            <View className="mb-8">
              <Text className="font-label text-label text-text-secondary mb-3">
                Nationality
              </Text>

              <CountryPicker
                value={nationality}
                onSelect={handleNationalitySelect}
                error={error}
                required
                placeholder="Select your nationality"
              />
            </View>

            {/* Info Note */}
            <View className="bg-gray-50 rounded-xl p-4 mb-8">
              <Text className="font-caption text-caption text-text-secondary leading-5">
                🌍 Your nationality helps us comply with international regulations and provide you with the best service possible.
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
            disabled={!nationality.trim()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
