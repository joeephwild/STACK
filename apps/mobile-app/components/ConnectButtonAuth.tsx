import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAddress, useConnect, useDisconnect, useWallet, ConnectWallet } from '@thirdweb-dev/react-native';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../lib/api';

interface ConnectButtonAuthProps {
  onAuthSuccess?: () => void;
  onAuthError?: (error: string) => void;
}

export const ConnectButtonAuth: React.FC<ConnectButtonAuthProps> = ({
  onAuthSuccess,
  onAuthError,
}) => {
  const address = useAddress();
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    error: authError,
    clearError 
  } = useAuthStore();

  const handleAuthenticate = async () => {
    if (!address || !wallet) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    try {
      setIsAuthenticating(true);
      clearError();

      // Get login payload from backend
      const payload = await apiClient.getLoginPayload(address);
      
      // Sign the payload with the wallet
      const signature = await wallet.sign(JSON.stringify(payload));
      
      // Send signed payload to backend for authentication
      await login(address, signature, payload);
      
      onAuthSuccess?.();
      Alert.alert('Success', 'Successfully authenticated!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      onAuthError?.(errorMessage);
      Alert.alert('Authentication Error', errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await disconnect();
      Alert.alert('Success', 'Successfully logged out!');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (isAuthenticated && user) {
    return (
      <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold text-gray-900">
            Welcome, {user.username || user.firstName || 'User'}!
          </Text>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Wallet Address:</Text>
          <Text className="text-xs font-mono text-gray-800 bg-gray-100 p-2 rounded">
            {user.walletAddress}
          </Text>
        </View>

        {user.email && (
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Email:</Text>
            <Text className="text-sm text-gray-800">{user.email}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-3 px-4 rounded-lg"
        >
          <Text className="text-white text-center font-medium">
            Disconnect & Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!address) {
    return (
      <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Connect Your Wallet
        </Text>
        <ConnectWallet 
          theme="light"
          btnTitle="Connect Wallet"
        />
      </View>
    );
  }

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Wallet Connected
        </Text>
        <Text className="text-sm text-gray-600 mb-1">Address:</Text>
        <Text className="text-xs font-mono text-gray-800 bg-gray-100 p-2 rounded">
          {address}
        </Text>
      </View>

      {authError && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <Text className="text-red-800 text-sm">{authError}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleAuthenticate}
        disabled={isAuthenticating}
        className={`py-3 px-4 rounded-lg ${
          isAuthenticating 
            ? 'bg-gray-400' 
            : 'bg-blue-500'
        }`}
      >
        {isAuthenticating ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="white" />
            <Text className="text-white font-medium ml-2">
              Authenticating...
            </Text>
          </View>
        ) : (
          <Text className="text-white text-center font-medium">
            Sign In with Wallet
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};