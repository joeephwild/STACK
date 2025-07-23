import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ConnectButtonAuth } from '../../components/ConnectButtonAuth';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Redirect to main app if authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="bg-primary-dark flex-1">
      <View className="flex-1 justify-center px-6 py-12">
        <View className="mb-8">
          <Text className="font-heading text-center text-h1 font-bold text-[#949FFF]">
            Connect your wallet
          </Text>
        </View>
      </View>
    </View>
  );
}
