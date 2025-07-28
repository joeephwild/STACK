import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from 'react-native';
import { ProgressBar } from '@stack/ui-library';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  phoneNumber: string;
  nationality: string;
  referralCode?: string;
}

interface AuthStepContextType {
  currentStepIndex: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  steps: ReactNode[];
}

const AuthStepContext = createContext<AuthStepContextType | undefined>(undefined);

interface AuthStepProviderProps {
  children: ReactNode[];
}

export function AuthStepProvider({ children }: AuthStepProviderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phoneNumber: '',
    nationality: '',
    referralCode: '',
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < children.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const value = {
    currentStepIndex,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    steps: children,
  };

  return (
    <AuthStepContext.Provider value={value}>
      <View className="flex-1">
        {/* Progress Bar */}
        <View className="px-6 pt-4">
          <ProgressBar
            progress={(currentStepIndex / (children.length - 1)) * 100}
            height={8}
            backgroundColor="#EAE2FF"
            progressColor="#B9FF4B"
            className="rounded-full"
          />
        </View>

        {/* Current Step */}
        {children[currentStepIndex]}
      </View>
    </AuthStepContext.Provider>
  );
}

export function useAuthStep() {
  const context = useContext(AuthStepContext);
  if (!context) {
    throw new Error('useAuthStep must be used within an AuthStepProvider');
  }
  return context;
}