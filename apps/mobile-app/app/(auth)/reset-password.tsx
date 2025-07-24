import React from 'react';
import { SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();

  const handleSuccess = () => {
    // Navigate back to login screen after successful password reset
    router.replace('/(auth)/login');
  };

  const handleBackPress = () => {
    // Navigate back to login screen
    router.replace('/(auth)/login');
  };

  if (!token) {
    // If no token is provided, redirect to login
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ResetPasswordForm
        token={token}
        onSuccess={handleSuccess}
        onBackPress={handleBackPress}
      />
    </SafeAreaView>
  );
}