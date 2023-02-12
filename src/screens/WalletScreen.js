import { View, TouchableOpacity } from 'react-native';
import CommonList from '~/components/CommonList';
import WalletHistoryItem from '~/components/WalletHistoryItem';
import useTailwind from '~/hooks/useTailwind';
import Text from '~/components/common/Text';
import { StackerNews } from '~/services/api';

export default WalletScreen = ({ route, navigation }) => {
  const { tw } = useTailwind();
  const { data: meData } = StackerNews.me();
  const queryRes = StackerNews.getWalletHistory({ inc: 'invoice,withdrawal' });
  return (
    <View style={tw`pt-10 flex-1`}>
      <View style={tw`flex flex-row justify-center items-baseline`}>
        <Text style={tw`text-center text-2xl`}>{meData?.me?.sats} </Text>
        <Text style={tw`ml-1 text-sm text-amber-500`}>sat</Text>
      </View>
      <View style={tw`flex flex-row justify-center`}>
        <View style={tw`mt-4 border-[2px] border-amber-400 border-b w-[70px]`} />
      </View>
      <View style={tw`flex-1 mt-4`}>
        <CommonList idKey="id" queryRes={queryRes} ListItem={WalletHistoryItem} />
      </View>
      <View style={tw`mt-4 mb-10 flex-row justify-between`}>
        <TouchableOpacity
          style={tw`py-4 px-12`}
          onPress={() => navigation.navigate('WalletReceiveScreen', { name: meData?.me?.name })}>
          <Text>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`py-4 px-12`}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
