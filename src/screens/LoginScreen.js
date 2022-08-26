import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import QRCode from 'react-native-qrcode-svg';

export default LoginScreen = ({ route }) => {
  const { tw } = useTailwind();
  const { data } = StackerNews.login(route.key);

  return (
    <View style={tw`mt-10 p-8 dark:bg-gray-800`}>
      <View style={tw`mt-10 flex-row justify-center bg-white py-4 mx-12`}>
        <QRCode value={data?.createAuth?.encodedUrl} size={200} />
      </View>

      <TouchableOpacity
        style={tw`p-4 dark:bg-white mt-4`}
        onPress={async () => {
          const t = await StackerNews.checkAuth(data?.createAuth?.k1);
          console.log(t);
        }}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};
