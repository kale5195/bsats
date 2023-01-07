import React, { Component, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import useTailwind from '~/hooks/useTailwind';
import { View } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { useToast } from 'react-native-toast-notifications';
import { useStores } from '~/stores';

export default function LoginScreen({ navigation }) {
  const route = useRoute();
  const toast = useToast();
  const { profileStore } = useStores();
  const { tw, isDark } = useTailwind();
  const [pending, setPending] = useState(false);
  const checkIfLogin = `
  let interval = setInterval(function(){
    const username = document.querySelector('.dropdown-toggle .nav-link').getAttribute("href");
    if(username){
        window.ReactNativeWebView.postMessage(username);
        clearInterval(interval);
    }
  }, 1000);
  true; // note: this is required, or you'll sometimes get silent failures
`;
  return (
    <View style={tw`flex-1`}>
      <WebView
        injectedJavaScript={checkIfLogin}
        source={{ uri: 'https://stacker.news/login' }}
        javaScriptEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        onMessage={(event) => {
          if (pending) return;
          const data = event.nativeEvent.data;
          if (data.startsWith('/')) {
            setPending(true);
            CookieManager.get('https://stacker.news').then((cookies) => {
              const sessionToken = cookies['__Secure-next-auth.session-token']['value'];
              if (sessionToken) {
                profileStore.setToken(sessionToken);
                profileStore.setUsername(data.slice(1));
                toast.show(`Login Successful`, {
                  type: 'success',
                  placement: 'bottom',
                  style: {
                    marginBottom: 100,
                  },
                });
                navigation.goBack();
              }
            });
          }
        }}
      />
    </View>
  );
}
