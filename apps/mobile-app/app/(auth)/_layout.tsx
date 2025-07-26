import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          title: 'Sign In',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Complete Profile',
          headerShown: false,
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          title: 'Verify Email',
          headerShown: false,
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Forgot Password',
          headerShown: false,
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          title: 'Reset Password',
          headerShown: false,
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          title: 'Welcome to STACK',
          headerShown: false,
          headerBackTitle: 'Back'
        }}
      />
    </Stack>
  );
}
