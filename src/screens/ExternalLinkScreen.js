import React, { Component } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import useTailwind from '~/hooks/useTailwind';

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
