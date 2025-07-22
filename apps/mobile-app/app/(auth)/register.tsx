import React from 'react';
import { useRouter } from 'expo-router';
import { RegistrationForm } from '../../components/RegistrationForm';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    router.replace('/(tabs)');
  };

  const handleCancel = () => {
    router.replace('/(tabs)');
  };

  return (
    <RegistrationForm 
      onRegistrationSuccess={handleRegistrationSuccess}
      onCancel={handleCancel}
    />
  );
}