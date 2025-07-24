import React from 'react';
import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';

export default function ForgotPasswordScreen() {
  const handleSuccess = () => {
    // Navigate back to login screen after successful email send
    router.back();
  };

  const handleBackPress = () => {
    // Navigate back to login screen
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ForgotPasswordForm
        onSuccess={handleSuccess}
        onBackPress={handleBackPress}
      />
    </SafeAreaView>
  );
}