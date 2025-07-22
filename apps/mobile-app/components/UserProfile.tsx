import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

export const UserProfile: React.FC = () => {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  if (!user) {
    return (
      <View className="p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-gray-500">No user data available</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-lg shadow-sm">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Welcome, {user.firstName || user.username || 'User'}!
        </Text>
        
        <View className="space-y-2">
          {user.username && (
            <View className="flex-row">
              <Text className="text-gray-600 font-medium w-20">Username:</Text>
              <Text className="text-gray-900">{user.username}</Text>
            </View>
          )}
          
          {user.email && (
            <View className="flex-row">
              <Text className="text-gray-600 font-medium w-20">Email:</Text>
              <Text className="text-gray-900">{user.email}</Text>
            </View>
          )}
          
          <View className="flex-row">
            <Text className="text-gray-600 font-medium w-20">Wallet:</Text>
            <Text className="text-gray-900 font-mono text-sm">
              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
            </Text>
          </View>
          
          <View className="flex-row">
            <Text className="text-gray-600 font-medium w-20">Joined:</Text>
            <Text className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        disabled={isLoading}
        className={`py-3 px-4 rounded-lg ${
          isLoading ? 'bg-gray-300' : 'bg-red-500'
        }`}
      >
        <Text className="text-white text-center font-medium">
          {isLoading ? 'Logging out...' : 'Logout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};