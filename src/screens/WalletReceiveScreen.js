import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { encodeLNUrl } from '~/lib/lnurl';
import { StackerNews } from '~/services/api';
import SatModal from '~/components/SatModal';
import WalletHistoryItem from '~/components/WalletHistoryItem';

export default function WalletReceiveScreen({ route }) {
  const { tw } = useTailwind();
  const { name } = route.params;
  const toast = useToast();
  const [code, setCode] = useState(encodeLNUrl(new URL(`https://stacker.news/.well-known/lnurlp/${name}`)));
  const [amount, setAmount] = useState(0);
  const [visible, setVisible] = useState(false);
  const { data } = StackerNews.getRecentInvoiceHistory({
    refetchInterval: 2000,
  });
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    toast.show('Copied to clipboard', { type: 'success' });
  };

  const onShare = async () => {
    await Share.share({
      title: '',
      message: code,
    });
  };

  const onCreateInvoice = async (customSats) => {
    const data = await StackerNews.createInvoice({ amount: customSats });

    if (data?.errno === -1) {
      toast.show(data.msg, { type: 'danger' });
      return false;
    } else {
      setAmount(customSats);
      setCode(data.createInvoice.bolt11);
      return true;
    }
  };
  return (
    <View>
      <View style={tw`mt-8 flex flex-col items-center`}>
        <View style={tw`bg-white p-4 rounded-lg border border-amber-400`}>
          <QRCode value={code} size={180} />
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`text-center text-neutral-500 text-xs`}>{amount > 0 ? `${amount} sats` : 'any amount'}</Text>
          <Text style={tw`mt-2 text-center text-neutral-500 text-xs`}>Funding @{name} on stacker.news</Text>
        </View>
        <View style={tw`mt-8 flex flex-row items-center`}>
          <TouchableOpacity style={tw`flex flex-col items-center`} onPress={copyToClipboard}>
            <View
              style={tw`bg-white rounded-full p-2 border border-neutral-300 dark:bg-gray-800 dark:border-neutral-600`}>
              <Ionicons size={16} style={tw`text-amber-500`} name="copy-outline" />
            </View>
            <Text style={tw`mt-1 text-xs text-neutral-500`}>copy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`ml-10 flex flex-col items-center`} onPress={onShare}>
            <View
              style={tw`bg-white rounded-full p-2 border border-neutral-300 dark:bg-gray-800 dark:border-neutral-600`}>
              <Ionicons size={16} style={tw`text-amber-500`} name="share-outline" />
            </View>
            <Text style={tw`mt-1 text-xs text-neutral-500`}>share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`ml-10 flex flex-col items-center`} onPress={() => setVisible(true)}>
            <View
              style={tw`bg-white rounded-full p-2 border border-neutral-300 dark:bg-gray-800 dark:border-neutral-600`}>
              <Ionicons size={16} style={tw`text-amber-500`} name="create-outline" />
            </View>
            <Text style={tw`mt-1 text-xs text-neutral-500`}>edit</Text>
          </TouchableOpacity>
          <SatModal
            title="Create Payment Invoice"
            buttonText="Confirm"
            visible={visible}
            setVisible={setVisible}
            onConfim={onCreateInvoice}
            presets={[10, 100, 1000, 10000]}
          />
        </View>
      </View>
      <View style={tw`mt-8 px-6 flex flex-col`}>
        <Text style={tw`text-neutral-500 dark:text-neutral-300 px-4 mb-2`}>Recent Invoices:</Text>
        {data?.walletHistory?.facts
          ?.slice(0, 3)
          .filter((fact) => fact.sats > 0)
          .map((fact) => {
            return <WalletHistoryItem item={fact} key={fact.id} />;
          })}
      </View>
    </View>
  );
}
