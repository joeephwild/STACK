import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useActiveAccount, useDisconnect, ConnectButton, useConnect } from 'thirdweb/react';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../lib/api';
import { client } from '../lib/client';
import { inAppWallet, preAuthenticate, authenticate } from 'thirdweb/wallets/in-app';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetRef } from './BottomSheet';
import { AuthBottomSheet } from './AuthBottomSheet';

const wallet = inAppWallet();

interface ConnectButtonAuthProps {
  onAuthSuccess?: () => void;
  onAuthError?: (error: string) => void;
}

export const ConnectButtonAuth: React.FC<ConnectButtonAuthProps> = ({
  onAuthSuccess,
  onAuthError,
}) => {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { user, isAuthenticated, login, logout, error: authError, clearError } = useAuthStore();
  const { connect, isConnecting, error } = useConnect();

  const authenticateUser = async () => {
    const result = await authenticate({
      client,
      strategy: 'email',
      email: 'example@example.org',
      verificationCode: '123456',
    });
  };

  const preLogin = async (email: string) => {
    // send email verification code
    await preAuthenticate({
      client,
      strategy: 'email',
      email,
    });
  };

  const loginWithEmail = async (email: string, verificationCode: string) => {
    // verify email with verificationCode and connect
    connect(async () => {
      await wallet.connect({
        client,
        strategy: 'email',
        email,
        verificationCode,
      });
      return wallet;
    });
  };

  const loginWithGoogle = async () => {
    // connect with google
    connect(async () => {
      await wallet.connect({
        client,
        strategy: 'google',
      });
      return wallet;
    });
  };

  const handleAuthenticate = async () => {
    if (!account) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    try {
      setIsAuthenticating(true);
      clearError();

      // Get login payload from backend
      const payload = await apiClient.getLoginPayload(account.address);

      // Sign the payload with the wallet
      const signature = await account.signMessage({ message: JSON.stringify(payload) });

      // Send signed payload to backend for authentication
      await login(account.address, signature, payload);

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
      Alert.alert('Success', 'Successfully logged out!');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.scrollTo(-300);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.scrollTo(0);
  };

  const handlePreAuth = async (email: string) => {
    await preAuthenticate({
      client,
      strategy: 'email',
      email,
    });
  };

  const handleEmailAuth = async (email: string, verificationCode: string, isSignUp: boolean) => {
    try {
      setIsAuthenticating(true);
      
      // Connect wallet with email verification
      await connect(async () => {
        await wallet.connect({
          client,
          strategy: 'email',
          email,
          verificationCode,
        });
        return wallet;
      });

      // Wait for account to be available
      setTimeout(async () => {
        await handleAuthenticate();
        
        // Route to appropriate screen based on sign up or sign in
        if (isSignUp) {
          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Email authentication failed';
      onAuthError?.(errorMessage);
      Alert.alert('Authentication Error', errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Connect wallet with Google
      await connect(async () => {
        await wallet.connect({
          client,
          strategy: 'google',
        });
        return wallet;
      });

      // Wait for account to be available
      setTimeout(async () => {
        await handleAuthenticate();
        router.push('/dashboard');
      }, 1000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
      onAuthError?.(errorMessage);
      Alert.alert('Authentication Error', errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };
  return (
    <>
      <View className="absolute bottom-10 w-full items-center px-6">
        <TouchableOpacity
          className="w-full rounded-xl bg-slate-900 p-4"
          onPress={openBottomSheet}
          disabled={isAuthenticating || isConnecting}
        >
          {(isAuthenticating || isConnecting) ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-lg font-bold text-white">Get Started</Text>
          )}
        </TouchableOpacity>
      </View>

      {isBottomSheetOpen && (
        <BottomSheet ref={bottomSheetRef} onClose={closeBottomSheet}>
          <AuthBottomSheet
            onEmailAuth={handleEmailAuth}
            onGoogleAuth={handleGoogleAuth}
            onPreAuth={handlePreAuth}
            onClose={closeBottomSheet}
            isLoading={isAuthenticating || isConnecting}
          />
        </BottomSheet>
      )}
    </>
  );
};
