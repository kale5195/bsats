import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { getSourceNameFromUrl } from '~/utils/textUtils';
import FixedTouchableOpacity from './FixedTouchableOpacity';

export default function PostUrl({ url }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  if (!url) {
    return null;
  }
  return (
    <FixedTouchableOpacity
      style={tw`pr-2`}
      onPress={() => {
        WebBrowser.openBrowserAsync(url);
      }}>
      <Text style={tw`text-sky-600 text-xs`} numberOfLines={1}>
        {getSourceNameFromUrl(url)}
      </Text>
    </FixedTouchableOpacity>
  );
}
