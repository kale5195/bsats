import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTailwind from '~/hooks/useTailwind';
import _ from 'lodash';
import { timeSince } from '~/lib/time';
import { abbrNum } from '~/lib/format';

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
    <View style={tw`relative mt-1 pr-1`}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`mr-1 text-xs text-neutral-500`}>{abbrNum(item.sats)} sats \</Text>
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
        <Text style={tw`text-xs text-neutral-500`}>{timeSince(new Date(item.createdAt))}</Text>
      </View>
      {!_.isNil(hiddenStatus) && (
        <TouchableOpacity onPress={hideComment} style={tw`absolute right-0 -top-2 p-2`}>
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
