import URL from 'url';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { encodeLNUrl } from '~/lib/lnurl';
import { StackerNews } from '~/services/api';

export default function WalletReceiveScreen({ route }) {
  const { tw } = useTailwind();
  const { name } = route.params;
  const toast = useToast();
  const [code, setCode] = useState(encodeLNUrl(new URL(`https://stacker.news/.well-known/lnurlp/${name}`)));

  const onSend = async () => {
    const data = await StackerNews.createInvoice({ amount: 1000 });

    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
    } else {
      // setCode(data.lnurlp);
    }
  };
  return (
    <View style={tw`mt-10 p-8 dark:bg-gray-800`}>
      <TouchableOpacity style={tw`bg-white py-4 px-12`} onPress={onSend}>
        <Text>Create Invoice</Text>
      </TouchableOpacity>
      <View style={tw`mt-10 flex-row justify-center bg-white py-4 mx-12`}>
        <QRCode value={code} size={200} />
      </View>
    </View>
  );
}
