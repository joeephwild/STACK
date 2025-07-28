import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthFlowData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  verificationCode: string;
}

interface AuthFlowContextType {
  data: AuthFlowData;
  updateData: (field: keyof AuthFlowData, value: string) => void;
  resetData: () => void;
  isComplete: boolean;
}

const initialData: AuthFlowData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  countryCode: '+1',
  verificationCode: ''
};

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(undefined);

interface AuthFlowProviderProps {
  children: ReactNode;
}

export function AuthFlowProvider({ children }: AuthFlowProviderProps) {
  const [data, setData] = useState<AuthFlowData>(initialData);

  const updateData = (field: keyof AuthFlowData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const resetData = () => {
    setData(initialData);
  };

  const isComplete = Boolean(
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.phoneNumber &&
    data.verificationCode
  );

  return (
    <AuthFlowContext.Provider value={{ data, updateData, resetData, isComplete }}>
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow() {
  const context = useContext(AuthFlowContext);
  if (context === undefined) {
    throw new Error('useAuthFlow must be used within an AuthFlowProvider');
  }
  return context;
}