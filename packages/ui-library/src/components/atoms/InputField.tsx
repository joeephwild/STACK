import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Ionicons } from './SafeIonicons';

interface InputFieldProps extends Omit<TextInputProps, 'onFocus' | 'onBlur'> {
  label: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'phone';
  icon?: keyof typeof Ionicons.glyphMap;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  isFocused?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  required = false,
  type = 'text',
  icon,
  value,
  onChangeText,
  placeholder,
  isPasswordVisible = false,
  onTogglePasswordVisibility,
  isFocused = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const getAutoCapitalize = () => {
    if (type === 'email') return 'none';
    return 'sentences';
  };

  const isPassword = type === 'password';
  const hasError = !!error;

  return (
    <View className="mb-4">
      {/* Label */}
      <Text className="font-label text-label text-text-secondary mb-2">
        {label}
        {required && <Text className="text-semantic-danger"> *</Text>}
      </Text>

      {/* Input Container */}
      <View
        className={`
          flex-row items-center
          bg-white
          border rounded-xl
          px-4 py-4
          ${isFocused ? 'border-primary' : hasError ? 'border-semantic-danger' : 'border-text-tertiary'}
          ${hasError ? 'bg-red-50' : ''}
        `}
      >
        {/* Leading Icon */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={hasError ? '#DC3545' : isFocused ? '#5852FF' : '#A0A0A0'}
            style={{ marginRight: 12 }}
          />
        )}

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          keyboardType={getKeyboardType()}
          autoCapitalize={getAutoCapitalize()}
          autoCorrect={false}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={onFocus}
          onBlur={onBlur}
          className="flex-1 font-body text-body text-text-primary"
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={onTogglePasswordVisibility}
            className="ml-2"
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={hasError ? '#DC3545' : '#A0A0A0'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {hasError && (
        <Text className="font-caption text-caption text-semantic-danger mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
