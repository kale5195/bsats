import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
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
      return 'Funding Wallet';
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

const getIcon = (item) => {
  switch (item.status) {
    case 'CONFIRMED':
      return 'checkmark-circle';
    case 'EXPIRED':
      return 'close';
    case 'PENDING':
      return 'timer-outline';
    default:
      return 'checkmark-circle';
  }
};

const getColor = (item) => {
  switch (item.status) {
    case 'EXPIRED':
      return 'text-neutral-400';
    case 'PENDING':
      return 'text-neutral-400';
    default:
      if (item.sats > 0) {
        return 'text-amber-500';
      }
      return 'text-red-500';
  }
};
export default function WalletHistoryItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const plus = item.sats > 0;
  return (
    <View style={tw`flex flex-row justify-between items-center mt-4 px-4`}>
      <Ionicons size={20} style={tw`text-amber-500`} name={getIcon(item)} />
      <View style={tw`ml-2 flex-1`}>
        <Text numberOfLines={1} style={tw`text-sm`}>
          {getDescriptionFromType(item)}
        </Text>
        <Text style={tw`text-xs text-neutral-500`}>
          {item.type} -{' '}
          {new Date(item.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </Text>
      </View>
      <View style={tw`ml-2 flex flex-row items-center flex-shrink-0 justify-end`}>
        <Text style={tw`${getColor(item)} text-sm`}>
          {plus ? '+' : ''}
          {item.sats}
        </Text>
        <Text style={tw`ml-1 text-xs text-neutral-500`}>sat</Text>
      </View>
    </View>
  );
}
