import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { timeSince } from '~/lib/time';
import PostDesc from '~/components/PostDesc';
import PostUrl from '~/components/PostUrl';
import FixedTouchableOpacity from './FixedTouchableOpacity';
import Text from './common/Text';

const getDescriptionFromType = (item) => {
  if (item.description) {
    return item.description;
  }
  switch (item.type) {
    case 'earn':
      return 'SN distributes sats to best users daily';
    case 'invoice':
      return 'No description';
    case 'withdrawal':
      return 'Withdrawal';
    case 'stacked':
      return item?.item?.title || item?.item?.text;
    case 'spent':
      return item?.item?.title || item?.item?.text;
    default:
      return 'Unknown';
  }
};
export default function WalletHistoryItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const plus = item.sats > 0;
  const expired = item.status === 'EXPIRED';
  return (
    <View style={tw`flex flex-row justify-between items-center mt-4 px-4`}>
      <Ionicons size={20} style={tw`text-amber-500`} name={`${expired ? 'close' : 'checkmark-circle'}`} />
      <View style={tw`ml-2 flex-1`}>
        <Text numberOfLines={1} style={tw`text-sm`}>
          {getDescriptionFromType(item)}
        </Text>
        <Text style={tw`text-xs text-neutral-500`}>
          {item.type} - {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={tw`ml-2 flex flex-row items-center flex-shrink-0 justify-end`}>
        <Text style={tw`${expired ? 'text-neutral-400' : plus ? 'text-amber-500' : 'text-red-500'} text-sm`}>
          {plus ? '+' : ''}
          {item.sats}
        </Text>
        <Text style={tw`ml-1 text-xs text-neutral-500`}>sat</Text>
      </View>
    </View>
  );
}
