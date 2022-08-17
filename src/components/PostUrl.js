import { Text, TouchableOpacity, View } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { useNavigation } from '@react-navigation/native';
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
      onPress={() => {
        navigation.push('ExternalLinkScreen', {
          url: url,
        });
      }}>
      <Text style={tw`text-sky-600 text-xs`}>{getSourceNameFromUrl(url)}</Text>
    </FixedTouchableOpacity>
  );
}
