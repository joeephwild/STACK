import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, checkAuthStatus, isLoading } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [isInitialized, setIsInitialized] = useState(false);
  const navigationRef = useRef(false);

  // Initialize auth status only once
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        await checkAuthStatus();
        if (isMounted) {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuthStatus, isInitialized]);

  // Handle navigation based on auth state
  useEffect(() => {
    if (!isInitialized || navigationRef.current) return;

    const inAuthGroup = segments[0] === '(auth)';
    const currentPath = segments.join('/');

    // Prevent navigation loops
    if (!isAuthenticated && !inAuthGroup && currentPath !== '(auth)/login') {
      navigationRef.current = true;
      router.replace('/(auth)/login');
      setTimeout(() => {
        navigationRef.current = false;
      }, 100);
    } else if (isAuthenticated && inAuthGroup && currentPath !== '(tabs)') {
      navigationRef.current = true;
      router.replace('/(tabs)');
      setTimeout(() => {
        navigationRef.current = false;
      }, 100);
    }
  }, [isAuthenticated, segments, isInitialized, router]);

  // Show loading state during initialization or auth loading
  if (!isInitialized || isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#5852FF" />
      </View>
    );
  }

  return <>{children}</>;
};
