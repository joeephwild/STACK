import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingStepProps } from './types';

interface PinSetupStepProps extends OnboardingStepProps {
  onPinSet: (pin: string) => void;
  isConfirmation?: boolean;
  originalPin?: string;
}

export function PinSetupStep({
  onNext,
  onSkip,
  currentStep,
  totalSteps,
  onPinSet,
  isConfirmation = false,
  originalPin,
}: PinSetupStepProps) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleNumberPress = (number: string) => {
    const currentIndex = pin.findIndex(digit => digit === '');
    if (currentIndex !== -1) {
      const newPin = [...pin];
      newPin[currentIndex] = number;
      setPin(newPin);
      setError('');

      // Check if PIN is complete
      if (newPin.every(digit => digit !== '') && newPin.join('').length === 4) {
        handlePinComplete(newPin.join(''));
      }
    }
  };

  const handleDelete = () => {
    const lastFilledIndex = pin.map((digit, index) => digit !== '' ? index : -1)
      .filter(index => index !== -1)
      .pop();

    if (lastFilledIndex !== undefined) {
      const newPin = [...pin];
      newPin[lastFilledIndex] = '';
      setPin(newPin);
      setError('');
    }
  };

  const handlePinComplete = (completedPin: string) => {
    if (isConfirmation) {
      if (completedPin === originalPin) {
        onPinSet(completedPin);
      } else {
        setError('PINs do not match. Please try again.');
        setPin(['', '', '', '']);
      }
    } else {
      onPinSet(completedPin);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6">

        {/* Content */}
        <View className="flex-1 items-center justify-center px-4">
          <View className="mb-8 h-[120px] w-[120px] items-center justify-center rounded-full bg-blue-100">
            <Text className="text-4xl">🔒</Text>
          </View>

          <Text className="mb-4 text-center font-h1 text-[32px] font-bold text-gray-900">
            {isConfirmation ? 'CONFIRM YOUR PIN' : 'SET YOUR APP PIN'}
          </Text>

          <Text className="mb-8 text-center text-base leading-6 text-gray-600">
            {isConfirmation
              ? 'Please re-enter your 4-digit PIN to confirm'
              : 'Create a 4-digit PIN to secure your app. You\'ll use this to access your account.'
            }
          </Text>

          {/* PIN Input */}
          <View className="mb-6 flex-row justify-center space-x-4">
            {pin.map((digit, index) => (
              <View
                key={index}
                className={`
                  h-16 w-16 rounded-xl border-2 items-center justify-center
                  ${error
                    ? 'border-red-500 bg-red-50'
                    : digit
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                  }
                `}
                style={{ marginHorizontal: 8 }}
              >
                <Text className="text-2xl font-bold text-gray-900">
                  {digit ? '●' : ''}
                </Text>
              </View>
            ))}
          </View>

          {/* Error Message */}
          {error && (
            <Text className="mb-4 text-center text-sm text-red-500">
              {error}
            </Text>
          )}

          {/* Custom Keyboard */}
          <View className="w-full max-w-[280px]">
            {/* Numbers 1-9 in 3x3 grid */}
            <View className="flex-row flex-wrap justify-center gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <TouchableOpacity
                  key={num}
                  className="w-[72px] h-[72px] rounded-full bg-gray-100 border-2 border-[#12141B] items-center justify-center"
                  onPress={() => handleNumberPress(num.toString())}
                >
                  <Text className="text-[24px] font-heading-regular text-[#12141B]">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Bottom row with 0 and delete */}
            <View className="flex-row justify-center items-center gap-4">
              {/* Empty space for alignment */}
              <View className="w-[72px] h-[72px]" />
              
              {/* Zero button */}
              <TouchableOpacity
                className="w-[72px] h-[72px] rounded-full bg-gray-100 border-2 border-[#12141B] items-center justify-center"
                onPress={() => handleNumberPress('0')}
              >
                <Text className="text-[24px] font-heading-regular text-[#12141B]">
                  0
                </Text>
              </TouchableOpacity>
              
              {/* Delete button */}
              <TouchableOpacity
                className="w-[72px] h-[72px] rounded-full bg-gray-100 border-2 border-[#12141B] items-center justify-center"
                onPress={handleDelete}
              >
                <Text className="text-[24px] font-heading-regular text-[#12141B]">
                  ←
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
