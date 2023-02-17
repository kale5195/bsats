import React, { useMemo } from 'react';
import { StackActions } from '@react-navigation/native';
import { decode } from 'light-bolt11-decoder';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import Text from '~/components/common/Text';
import TextInput from '~/components/common/TextInput';

const mapping = {
  INVOICE: 'Invoice Description',
  LNURL: 'Lightning Address',
  MANUAL: 'Invoice or Lightning Address',
};
// LNURL not support
// any amount not support
export default function PaymentConfirmScreen({ navigation, route }) {
  const { tw } = useTailwind();
  const toast = useToast();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const parseUserInput = (text) => {
    if (new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(text)) {
      return { type: 'LNURL', input: text, userAmount: 0 };
    }
    try {
      const decoded = decode(text);
      const decodedAmount = decoded.sections.find((s) => s.name === 'amount')?.value / 1000;
      const decodedDesc = decoded.sections.find((s) => s.name === 'description')?.value;
      if (isNaN(decodedAmount)) {
        setError(true);
        toast.show('Not support', { type: 'danger', duration: 3000 });
        return {
          type: 'MANUAL',
          input: '',
          userAmount: 0,
        };
      }
      return {
        type: 'INVOICE',
        input: decodedDesc || 'Valid Incoice Without Description',
        userAmount: `${decodedAmount}`,
      };
    } catch (e) {
      if (text.trim().length > 0) {
        setError(true);
        toast.show('Invalid invoice or lightning address', { type: 'danger', duration: 3000 });
      }
      return {
        type: 'MANUAL',
        input: '',
        userAmount: 0,
      };
    }
  };
  const {
    params: { userInput },
  } = route;

  const { type, input, userAmount } = useMemo(() => {
    return parseUserInput(userInput);
  }, [userInput]);

  const [amount, setAmount] = React.useState(userAmount);
  const [text, setText] = React.useState(input);
  const [fee, setFee] = React.useState('10');

  const onSumbit = async () => {
    let data;
    setLoading(true);
    if (new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(text)) {
      data = await StackerNews.sendToLnAddr({
        addr: text,
        amount: parseInt(amount, 10),
        maxFee: parseInt(fee, 10),
      });
    } else {
      data = await StackerNews.createWithdrawl({
        invoice: userInput,
        maxFee: parseInt(fee, 10),
      });
    }
    if (data?.errno === -1) {
      toast.show(data.msg || 'Invalid Input', { type: 'danger', duration: 3000 });
      setLoading(false);
    } else {
      const widthdawId = data?.sendToLnAddr?.id || data?.createWithdrawl?.id;
      let i = 0;
      while (i < 10) {
        await new Promise((r) => setTimeout(r, 1000));
        const widthdrawData = await StackerNews.queryWithdrawl({
          id: widthdawId,
        });
        if (widthdrawData?.withdrawl?.status === 'CONFIRMED') {
          toast.show('succcess', { type: 'success' });
          setLoading(false);
          return navigation.dispatch(StackActions.replace('WalletScreen'));
        } else if (widthdrawData?.withdrawl?.status) {
          toast.show(widthdrawData?.withdrawl?.status, { type: 'danger' });
          setLoading(false);
          break;
        }
        i++;
      }
      if (i === 10) {
        toast.show('Timeout', { type: 'danger' });
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={65} enableOnAndroid={true}>
      <View style={tw`mt-4 p-2`}>
        {error && (
          <View style={tw`bg-blue-500 p-2 rounded-lg mx-4`}>
            <Text style={tw`text-base text-white`}>
              Sorry, for now sending feature only supports lightning address or bolt11 lightning invoice with amounts
            </Text>
          </View>
        )}
        <Text style={tw`mt-8 text-lg mx-4`}>{mapping[type]}</Text>
        <TextInput onChangeText={setText} value={text} style={tw`mt-1 mx-4`} editable={type !== 'INVOICE'} />

        <Text style={tw`mt-8 text-lg mx-4`}>Amount (sats)</Text>
        <TextInput
          onChangeText={setAmount}
          value={amount}
          keyboardType="numeric"
          style={tw`mt-1 mx-4`}
          placeholder="Please input send amount"
          editable={type !== 'INVOICE'}
        />

        <Text style={tw`mt-8 text-lg mx-4`}>Max Fee (sats)</Text>
        <TextInput onChangeText={setFee} value={fee} keyboardType="numeric" style={tw`mt-1 mx-4`} />
        <View style={tw`mt-8 flex flex-row justify-center`}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={tw`bg-yellow-400 rounded-md`} onPress={onSumbit}>
              <Text style={tw`text-white text-lg px-3 py-0.5`}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
