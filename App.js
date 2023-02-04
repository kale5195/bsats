import 'expo-dev-client';
import { useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import { QueryClient, QueryClientProvider } from 'react-query';
import { StoresProvider, hydrateStores } from '~/stores';
import AppNavigator from './src/navigation/navigator';
import { queryClient } from '~/services/queryClient';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const startApp = useCallback(async () => {
    // await SplashScreen.preventAutoHideAsync();
    await hydrateStores();
    //await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StoresProvider>
            <ToastProvider offsetBottom={80} duration={2000}>
              <QueryClientProvider client={queryClient}>
                <AppNavigator />
              </QueryClientProvider>
            </ToastProvider>
          </StoresProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
