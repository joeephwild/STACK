import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Button, Icon } from '@stack/ui-library';
import { useNavigation } from 'expo-router';

interface ReferralStepProps {
  onNext: (data: { referralCode?: string }) => void;
  onBack?: () => void;
  initialData?: { referralCode?: string };
}

export function ReferralStep({ onNext, onBack, initialData }: ReferralStepProps) {
  const [referralCode, setReferralCode] = useState(initialData?.referralCode || '');
  const [isCodeApplied, setIsCodeApplied] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const validateReferralCode = (code: string): boolean => {
    // Basic validation - adjust according to your referral code format
    if (!code.trim()) return false;
    if (code.length < 4 || code.length > 20) return false;
    return /^[A-Za-z0-9]+$/.test(code);
  };

  const handleApplyCode = () => {
    const trimmedCode = referralCode.trim();
    
    if (!trimmedCode) {
      setError('Please enter a referral code');
      return;
    }

    if (!validateReferralCode(trimmedCode)) {
      setError('Invalid referral code format');
      return;
    }

    // TODO: Validate referral code with backend
    setIsCodeApplied(true);
    setError(undefined);
  };

  const handleContinue = () => {
    onNext({ referralCode: isCodeApplied ? referralCode.trim() : undefined });
  };

  const handleSkip = () => {
    onNext({ referralCode: undefined });
  };

  const handleReferralCodeChange = (value: string) => {
    setReferralCode(value);
    setIsCodeApplied(false);
    if (error) {
      setError(undefined);
    }
  };

  const handleClose = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* Header with Close Button */}
        <View className="flex-row justify-between items-center pt-4 pb-8">
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 items-center justify-center"
          >
            <Icon name="close" library="ionicons" size={24} color="#000000" />
          </TouchableOpacity>
          <View className="w-8 h-8" />
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            {/* Title */}
            <Text className="font-h1 text-h1 text-text-primary mb-8">
              Got a referral code?
            </Text>

            {/* Referral Code Input Section */}
            <View className="mb-6">
              <Text className="font-label text-label text-text-secondary mb-3">
                Referral Code (Optional)
              </Text>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <TextInput
                    value={referralCode}
                    onChangeText={handleReferralCodeChange}
                    placeholder=""
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect={false}
                    editable={!isCodeApplied}
                    className={`
                      bg-white
                      border border-text-tertiary
                      rounded-xl
                      px-4 py-4
                      font-body text-body text-text-primary
                      ${error ? 'border-semantic-danger' : ''}
                      ${isCodeApplied ? 'border-semantic-success bg-green-50' : ''}
                    `}
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  />
                </View>

                {!isCodeApplied && referralCode.trim() && (
                  <TouchableOpacity
                    onPress={handleApplyCode}
                    className="bg-accent-primary rounded-xl px-6 py-4 justify-center"
                  >
                    <Text className="font-label text-label text-white">
                      Apply
                    </Text>
                  </TouchableOpacity>
                )}

                {isCodeApplied && (
                  <View className="bg-semantic-success rounded-xl px-6 py-4 justify-center">
                    <Icon name="checkmark" library="ionicons" size={20} color="#ffffff" />
                  </View>
                )}
              </View>

              {error && (
                <Text className="font-caption text-caption text-semantic-danger mt-2">
                  {error}
                </Text>
              )}

              {isCodeApplied && (
                <Text className="font-caption text-caption text-semantic-success mt-2">
                  ✓ Referral code applied successfully!
                </Text>
              )}
            </View>

            {/* Benefits Section */}
            <View className="bg-gray-50 rounded-xl p-4 mb-8">
              <Text className="font-label text-label text-text-primary mb-3">
                🎁 Referral Benefits
              </Text>
              <View className="space-y-2">
                <Text className="font-caption text-caption text-text-secondary leading-5">
                  • Get bonus rewards when you use a valid referral code
                </Text>
                <Text className="font-caption text-caption text-text-secondary leading-5">
                  • Unlock exclusive features and early access
                </Text>
                <Text className="font-caption text-caption text-text-secondary leading-5">
                  • Join a community of verified users
                </Text>
              </View>
            </View>

            {/* Info Note */}
             <View className="bg-blue-50 rounded-xl p-4 mb-8">
               <Text className="font-caption text-caption text-text-secondary leading-5">
                 💡 Don&apos;t have a referral code? No worries! You can always add one later in your account settings.
               </Text>
             </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View className="pb-6 space-y-3">
          {/* Continue Button */}
          {isCodeApplied ? (
            <Button
              title="Continue with Referral"
              variant="accent"
              fullWidth
              onPress={handleContinue}
            />
          ) : (
            <Button
              title="Continue"
              variant="accent"
              fullWidth
              onPress={handleContinue}
            />
          )}

          {/* Skip Button */}
          <Button
            title="Skip for now"
            variant="tertiary"
            fullWidth
            onPress={handleSkip}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}