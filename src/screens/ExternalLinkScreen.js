import React, { Component } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import useTailwind from '~/hooks/useTailwind';
import { View } from 'react-native';
export default function ExternalLinkScreen() {
  const route = useRoute();
  const { tw, isDark } = useTailwind();
  const { url } = route.params;
  return (
    <View style={tw`flex-1`}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
