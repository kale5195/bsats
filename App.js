import 'expo-dev-client';
import 'text-encoding';
import { useEffect, useCallback } from 'react';
import { decode, encode } from 'base-64';
import { polyfillWebCrypto } from 'expo-standard-web-crypto';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import { QueryClient, QueryClientProvider } from 'react-query';
import { StoresProvider, hydrateStores } from '~/stores';
import AppNavigator from './src/navigation/navigator';
import { queryClient } from '~/services/queryClient';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NostrProvider } from 'nostr-react';

// Polyfill for base64
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

const relayUrls = ['wss://relay.snort.social', 'wss://relay.nostr.ch'];
polyfillWebCrypto();

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
      <NostrProvider relayUrls={relayUrls} debug={false}>
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
      </NostrProvider>
    </SafeAreaProvider>
  );
}
