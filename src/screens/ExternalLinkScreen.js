import React, { Component } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import useTailwind from '~/hooks/useTailwind';
import { ActivityIndicator, View } from 'react-native';
export default function ExternalLinkScreen() {
  const route = useRoute();
  const { tw, isDark } = useTailwind();
  const { url } = route.params;
  const [loading, setLoading] = React.useState(true);
  return (
    <View style={tw`flex-1 relative`}>
      <WebView onLoadEnd={() => setLoading(false)} source={{ uri: url }} />
      {loading && <ActivityIndicator size="large" style={tw`absolute top-1/3 left-1/2`} />}
    </View>
  );
}
