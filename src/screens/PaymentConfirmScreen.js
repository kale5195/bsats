import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useToast } from 'react-native-toast-notifications';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import Text from '~/components/common/Text';
import TextInput from '~/components/common/TextInput';

export default function PaymentConfirmScreen({ navigation, route }) {
  const { tw } = useTailwind();
  const toast = useToast();
  const {
    params: { userInvoice, userAddress, amount },
  } = route;

  const onSumbit = async () => {};
  const [invoice, setInvoice] = React.useState(userInvoice);
  const [url, setUrl] = React.useState('');
  const [text, setText] = React.useState('');
  return (
    <KeyboardAwareScrollView extraScrollHeight={65} enableOnAndroid={true}>
      <View style={tw`mt-4 p-2`}>
        <Text style={tw`text-xl mx-4`}>Invoice</Text>
        <TextInput onChangeText={setInvoice} value={invoice} style={tw`mt-1 mx-4`} />

        <View style={tw`mt-8 flex flex-row justify-center`}>
          <TouchableOpacity style={tw`bg-yellow-400 rounded-md`} onPress={onSumbit}>
            <Text style={tw`text-white text-xl px-3 py-1`}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
