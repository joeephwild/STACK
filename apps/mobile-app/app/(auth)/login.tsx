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
    <ScrollView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Welcome to STACK
          </Text>
          <Text className="text-gray-600 text-center text-lg">
            Connect your wallet to get started
          </Text>
        </View>

        <View className="mb-8">
          <ConnectButtonAuth 
            onAuthSuccess={handleAuthSuccess}
            onAuthError={(error) => console.error('Auth error:', error)}
          />
        </View>

        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text className="text-blue-800 text-sm font-medium mb-2">
            🔐 Secure Wallet Authentication
          </Text>
          <Text className="text-blue-700 text-sm">
            Your wallet serves as your secure login method. No passwords needed - 
            just connect and sign with your wallet to access your account.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}