import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { encodeLNUrl } from '~/lib/lnurl';
import QRCode from 'react-native-qrcode-svg';

export default QRcodeScreen = ({ route }) => {
  const { tw } = useTailwind();
  const { name } = route.params;
  const lnurlp = encodeLNUrl(new URL(`https://stacker.news/.well-known/lnurlp/${name}`));
  return (
    <View style={tw`mt-10 p-8 dark:bg-gray-800`}>
      <TouchableOpacity style={tw`mt-4 bg-amber-300 py-3 rounded-md `}>
        <Text style={tw`text-base text-black font-bold text-center`} numberOfLines={1}>
          ⚡{name}@stacker.news
        </Text>
      </TouchableOpacity>
      <View style={tw`mt-10 flex-row justify-center bg-white py-4 mx-12`}>
        <QRCode value={lnurlp} size={200} />
      </View>
    </View>
  );
};
