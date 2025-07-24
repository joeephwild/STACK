import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { SigninForm } from '../../components/auth/SigninForm';

export default function LoginScreen() {
  const handleSuccess = () => {
    // Navigate to main app after successful login
    router.replace('/(tabs)');
  };

  const handleSignupPress = () => {
    // Navigate to register screen
    router.push('/(auth)/register');
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    router.push('/(auth)/forgot-password');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SigninForm
        onSuccess={handleSuccess}
        onSignupPress={handleSignupPress}
        onForgotPassword={handleForgotPassword}
      />
    </SafeAreaView>
  );
}
