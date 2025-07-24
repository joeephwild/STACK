import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { SignupForm } from '../../components/auth/SignupForm';

export default function RegisterScreen() {
  const handleSuccess = () => {
    // Navigate to main app after successful registration
    router.replace('/(tabs)');
  };

  const handleCancel = () => {
    // Navigate to login screen
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SignupForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </SafeAreaView>
  );
}
