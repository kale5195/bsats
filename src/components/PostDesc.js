import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTailwind from '~/hooks/useTailwind';
import { fromNowUTC } from '~/utils/dateUtils';
import _ from 'lodash';

export default function PostDesc({
  item,
  term = 'comments',
  isOp = false,
  hiddenStatus = undefined,
  hideComment = undefined,
}) {
  const { tw, isDark } = useTailwind();
  const navigation = useNavigation();
  return (
    <View style={tw`flex flex-row justify-between items-center mt-1 pr-1`}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`mr-1 text-xs text-neutral-500`}>{item.sats} sats \</Text>
        <Text style={tw`mr-1 text-xs text-neutral-500`}>
          {item.ncomments} {term} \
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('ProfileScreen', { name: item.user.name });
          }}>
          <Text style={tw`mr-1 text-xs text-sky-600`}>@{item.user.name}</Text>
        </TouchableOpacity>
        {isOp && <Text style={tw`text-xs text-purple-600 font-bold mr-1`}>OP</Text>}
        <Text style={tw`text-xs text-neutral-500`}>{fromNowUTC(item.createdAt)}</Text>
      </View>
      {!_.isNil(hiddenStatus) && (
        <TouchableOpacity onPress={hideComment}>
          <MaterialCommunityIcons
            size={12}
            name={hiddenStatus ? 'chevron-down' : 'chevron-up'}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
