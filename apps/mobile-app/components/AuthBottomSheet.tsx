import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AuthBottomSheetProps {
  onEmailAuth: (email: string, verificationCode: string, isSignUp: boolean) => Promise<void>;
  onGoogleAuth: () => Promise<void>;
  onPreAuth: (email: string) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export const AuthBottomSheet: React.FC<AuthBottomSheetProps> = ({
  onEmailAuth,
  onGoogleAuth,
  onPreAuth,
  onClose,
  isLoading = false,
}) => {
  const [authStep, setAuthStep] = useState<'initial' | 'email' | 'verification'>('initial');
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      await onPreAuth(email);
      setAuthStep('verification');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    try {
      setIsSubmitting(true);
      await onEmailAuth(email, verificationCode, isSignUp);
      onClose();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsSubmitting(true);
      await onGoogleAuth();
      onClose();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Google authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInitialStep = () => (
    <View className="flex-1">
      <View className="mb-8">
        <Text className="text-h1 font-heading font-bold text-gray-900 text-center mb-2">
          Welcome to STACK
        </Text>
        <Text className="text-gray-600 text-center">
          Choose how you'd like to get started
        </Text>
      </View>

      <View className="space-y-4">
        {/* Toggle between Sign Up and Sign In */}
        <View className="flex-row bg-gray-100 rounded-lg p-1 mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${isSignUp ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setIsSignUp(true)}
          >
            <Text className={`text-center font-medium ${isSignUp ? 'text-gray-900' : 'text-gray-600'}`}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${!isSignUp ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setIsSignUp(false)}
          >
            <Text className={`text-center font-medium ${!isSignUp ? 'text-gray-900' : 'text-gray-600'}`}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Google Auth Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-4 px-6 mb-4"
          onPress={handleGoogleAuth}
          disabled={isSubmitting || isLoading}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text className="ml-3 text-gray-900 font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Email Auth Button */}
        <TouchableOpacity
          className="bg-slate-900 rounded-lg py-4 px-6"
          onPress={() => setAuthStep('email')}
          disabled={isSubmitting || isLoading}
        >
          <Text className="text-white text-center font-medium">
            Continue with Email
          </Text>
        </TouchableOpacity>
      </View>

      {(isSubmitting || isLoading) && (
        <View className="absolute inset-0 bg-white/80 items-center justify-center">
          <ActivityIndicator size="large" color="#1e293b" />
        </View>
      )}
    </View>
  );

  const renderEmailStep = () => (
    <View className="flex-1">
      <TouchableOpacity
        className="flex-row items-center mb-6"
        onPress={() => setAuthStep('initial')}
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
        <Text className="ml-2 text-gray-700">Back</Text>
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text className="text-gray-600">
          Enter your email to {isSignUp ? 'get started' : 'sign in'}
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          className="bg-slate-900 rounded-lg py-4 px-6 mt-6"
          onPress={handleEmailSubmit}
          disabled={isSubmitting || !email.trim()}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-medium">
              Send Verification Code
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVerificationStep = () => (
    <View className="flex-1">
      <TouchableOpacity
        className="flex-row items-center mb-6"
        onPress={() => setAuthStep('email')}
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
        <Text className="ml-2 text-gray-700">Back</Text>
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Check Your Email
        </Text>
        <Text className="text-gray-600">
          We sent a verification code to {email}
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 font-medium mb-2">Verification Code</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-center text-lg tracking-widest"
            placeholder="000000"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <TouchableOpacity
          className="bg-slate-900 rounded-lg py-4 px-6 mt-6"
          onPress={handleVerificationSubmit}
          disabled={isSubmitting || verificationCode.length !== 6}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-medium">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="py-2"
          onPress={handleEmailSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-slate-900 text-center">
            Didn't receive the code? Resend
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 pt-4">
      {authStep === 'initial' && renderInitialStep()}
      {authStep === 'email' && renderEmailStep()}
      {authStep === 'verification' && renderVerificationStep()}
    </View>
  );
};
