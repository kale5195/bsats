import { View, TouchableOpacity, Text } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';

export default WalletScreen = ({ route, navigation }) => {
  const { tw } = useTailwind();
  const { data: meData } = StackerNews.me();
  return (
    <View style={tw`mt-10 p-8 dark:bg-gray-800`}>
      <Text style={tw`text-center`}>{meData?.me?.sats} sats</Text>
      <View style={tw`mt-10 flex-row justify-between`}>
        <TouchableOpacity
          style={tw` bg-white py-4 px-12`}
          onPress={() => navigation.navigate('WalletReceiveScreen', { name: meData?.me?.name })}>
          <Text>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw` bg-white py-4 px-12`}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
