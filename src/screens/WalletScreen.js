import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import { queryClient } from '~/services/queryClient';
import CommonList from '~/components/CommonList';
import WalletHistoryItem from '~/components/WalletHistoryItem';
import Text from '~/components/common/Text';

export default function WalletScreen({ route, navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['wallet-history', { inc: 'invoice,withdrawal' }] });
      refetchMe();
    }, [queryRes])
  );

  const { tw } = useTailwind();
  const { data: meData, refetch: refetchMe } = StackerNews.me();
  const queryRes = StackerNews.getWalletHistory({ inc: 'invoice,withdrawal' });
  return (
    <View style={tw`pt-8 flex-1`}>
      <View style={tw`flex flex-row justify-center items-baseline`}>
        <Text style={tw`text-center text-3xl`}>{meData?.me?.sats} </Text>
        <Text style={tw`ml-1 text-sm text-amber-500`}>sat</Text>
      </View>
      <View style={tw`flex flex-row justify-center`}>
        <View style={tw`mt-4 border-[2px] border-amber-400 border-b w-[70px]`} />
      </View>
      <View style={tw`flex-1 mt-4`}>
        <CommonList idKey="id" queryRes={queryRes} ListItem={WalletHistoryItem} />
      </View>
      <View style={tw`mt-4 mb-10 flex-row justify-between items-center`}>
        <TouchableOpacity
          style={tw`py-4 px-12 flex flex-row items-center`}
          onPress={() => navigation.navigate('WalletReceiveScreen', { name: meData?.me?.name })}>
          <Ionicons size={18} style={tw`text-amber-500`} name="md-download-outline" />
          <Text style={tw`ml-1`}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`py-4 px-12 flex flex-row items-center`}
          onPress={() => navigation.navigate('WalletSendScreen')}>
          <Ionicons size={18} style={tw`text-amber-500`} name="scan-outline" />
          <Text style={tw`ml-1`}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
