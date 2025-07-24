import '../global.css';
import 'react-native-get-random-values';

import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { ThirdwebProvider } from 'thirdweb/react';
import { useCustomFonts } from '../lib/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThirdwebProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={unstable_settings.initialRouteName}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThirdwebProvider>
    </GestureHandlerRootView>
  );
}
