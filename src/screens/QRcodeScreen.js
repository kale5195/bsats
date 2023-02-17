import * as Clipboard from 'expo-clipboard';
import { Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { encodeLNUrl } from '~/lib/lnurl';

export default function QRcodeScreen({ route }) {
  const { tw } = useTailwind();
  const { name } = route.params;
  const toast = useToast();
  const lnurlp = encodeLNUrl(new URL(`https://stacker.news/.well-known/lnurlp/${name}`));
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${name}@stacker.news`);
    toast.show('Copied to clipboard', { type: 'success' });
  };

  return (
    <View style={tw`mt-10 p-8`}>
      <TouchableOpacity style={tw`mt-4 bg-amber-300 py-3 rounded-md`} onPress={copyToClipboard}>
        <Text style={tw`text-base text-black font-bold text-center`} numberOfLines={1}>
          ⚡{name}@stacker.news
        </Text>
      </TouchableOpacity>
      <View style={tw`mt-10 flex-row justify-center bg-white py-4 mx-12`}>
        <QRCode value={lnurlp} size={200} />
      </View>
    </View>
  );
}
