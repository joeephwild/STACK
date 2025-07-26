import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Button, Icon } from '@stack/ui-library';
import { useAuthStore } from '~/store/authStore';

export default function VerifyEmailScreen() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const { email } = useLocalSearchParams<{ email: string }>();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { verifyEmail, resendVerification, isLoading, error, clearError } = useAuthStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError();
  }, [clearError]);

  const handleCodeChange = (value: string, index: number) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Clear error when user starts typing
    if (error) {
      clearError();
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyEmail = async () => {
    const code = verificationCode.join('');

    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit verification code');
      return;
    }

    // Clear any previous errors before attempting verification
    clearError();

    try {
      const res = await verifyEmail({ token: code });
      console.log('res', res);

      // If we get here, verification was successful
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => router.replace('/(auth)/onboarding') },
      ]);
    } catch (error) {
      // The error is already set in the store by the verifyEmail function
      console.log('Verification error:', error);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Email address not found');
      return;
    }

    try {
      setIsResending(true);
      const response = await resendVerification({ email });
      Alert.alert('Success', response.message || 'Verification code sent!');
      // Clear the current code when resending
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');
  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '';

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4">
        {/* Header with Close Button and Help */}
        <View className="flex-row justify-between items-center pt-4 pb-8">
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 items-center justify-center"
          >
            <Icon name="arrow-back" library="ionicons" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary-light rounded-full px-4 py-2">
            <Text className="font-label text-label text-primary">Help</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            {/* Title */}
            <Text className="font-h1 text-h1 text-text-primary mb-4">
              We just sent you an SMS
            </Text>

            {/* Description */}
            <Text className="font-body text-body text-text-secondary mb-8">
              Enter the security code we sent to{'\n'}
              <Text className="font-body-bold text-text-primary">{maskedEmail}</Text>
            </Text>

            {/* 6-Digit Code Input */}
            <View className="flex-row justify-between mb-8">
              {verificationCode.map((digit, index) => (
                <View key={index} className="relative">
                  <TextInput
                     ref={(ref) => { inputRefs.current[index] = ref; }}
                     value={digit}
                    onChangeText={(value) => handleCodeChange(value, index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className={`
                      w-12 h-12
                      border-2 rounded-xl
                      text-center
                      font-h2 text-h2 text-text-primary
                      ${digit ? 'border-text-primary bg-white' : 'border-text-tertiary bg-white'}
                      ${error ? 'border-semantic-danger' : ''}
                    `}
                    style={{
                      fontSize: 20,
                      lineHeight: 24,
                    }}
                    autoFocus={index === 0}
                  />
                </View>
              ))}
            </View>

            {/* Error Message */}
            {error && (
              <View className="mb-6">
                <Text className="font-caption text-caption text-semantic-danger text-center">
                  {error}
                </Text>
              </View>
            )}

            {/* Didn't receive code link */}
            <View className="items-center mb-8">
              <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
                <Text className="font-body text-body text-text-primary underline">
                  {isResending ? 'Sending...' : "Didn't receive a code?"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="pb-6">
          {/* Done Button */}
          <Button
            title="Done"
            variant="accent"
            fullWidth
            onPress={handleVerifyEmail}
            loading={isLoading}
            disabled={isLoading || !isCodeComplete}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
