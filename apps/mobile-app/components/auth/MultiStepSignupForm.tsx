import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { EmailStep } from './steps/EmailStep';
import { PasswordStep } from './steps/PasswordStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { PhoneNumberSection } from './steps/PhoneNumberSection';
import { NationalitySection } from './steps/NationalitySection';
import { ReferralStep } from './steps/ReferralStep';
import { useAuthStore } from '../../store/authStore';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  phoneNumber: string;
  nationality: string;
  referralCode?: string;
}

const STEPS = [
  { id: 1, title: 'Email' },
  { id: 2, title: 'Password' },
  { id: 3, title: 'Personal Info' },
  { id: 4, title: 'Phone Number' },
  { id: 5, title: 'Nationality' },
  { id: 6, title: 'Referral' },
];

export function MultiStepSignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phoneNumber: '',
    nationality: '',
    referralCode: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signupWithEmail } = useAuthStore();

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = (stepData: Partial<FormData>) => {
    // updateFormData(stepData);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      //   // Prepare signup data
      //   const signupData = {
      //     email: formData.email,
      //     password: formData.password,
      //     displayName: formData.displayName,
      //     phoneNumber: formData.phoneNumber,
      //     nationality: formData.nationality,
      //     referralCode: formData.referralCode,
      //   };

      //   await signupWithEmail(signupData);

      // Navigate to email verification or success screen
      router.replace('/(auth)/onboarding');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep onNext={handleNext} initialData={{ email: formData.email }} />;
      case 2:
        return (
          <PasswordStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={{
              password: formData.password,
            }}
          />
        );
      case 3:
        return (
          <PersonalInfoStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={{
              displayName: formData.displayName,
            }}
          />
        );
      case 4:
        return (
          <PhoneNumberSection
            onNext={handleNext}
            onBack={handleBack}
            initialData={{ phoneNumber: formData.phoneNumber }}
            defaultCountry="US"
          />
        );
      case 5:
        return (
          <NationalitySection
            onNext={handleNext}
            onBack={handleBack}
            initialData={{ nationality: formData.nationality }}
          />
        );
      case 6:
        return (
          <ReferralStep
            onNext={handleSubmit}
            onBack={handleBack}
            initialData={{ referralCode: formData.referralCode }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View className="flex-1">
          {/* Step Content */}
          <View className="flex-1 px-6 pb-6">{renderCurrentStep()}</View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
