import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@stack/ui-library';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function CompleteStep() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View className="flex-1 bg-surface-light px-6 py-8">
      <View className="flex-1 items-center justify-center">
        <View className="bg-accent-limeGreen rounded-full p-4 mb-6">
          <Ionicons name="checkmark" size={48} color="#000000" />
        </View>

        <Text className="font-display text-display text-text-primary text-center mb-2">
          Welcome Aboard!
        </Text>
        
        <Text className="font-body text-body text-text-secondary text-center mb-8">
          Your account has been created successfully. Get ready to explore amazing features!
        </Text>

        <Button
          title="Get Started"
          variant="accent"
          size="large"
          onPress={handleGetStarted}
          fullWidth
          icon={<Ionicons name="arrow-forward" size={24} color="#000000" />}
        />
      </View>
    </View>
  );
}