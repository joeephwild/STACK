import '../global.css';
import 'react-native-get-random-values';

import { Stack } from 'expo-router';
import { ThirdwebProvider, thirdwebConfig } from '../lib/client';
import { AuthGuard } from '../components/AuthGuard';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThirdwebProvider
      clientId={thirdwebConfig.clientId}
      activeChain={thirdwebConfig.activeChain}
      supportedChains={thirdwebConfig.supportedChains}
    >
      <AuthGuard>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthGuard>
    </ThirdwebProvider>
  );
}
