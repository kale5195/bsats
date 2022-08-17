import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTailwind from '~/hooks/useTailwind';
import { fromNowUTC } from '~/utils/dateUtils';

export default function PostDesc({ item, term = 'comments', showEye = false, isOp = false }) {
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
      {showEye && (
        <View>
          <MaterialCommunityIcons size={12} name="eye-outline" color={isDark ? 'white' : 'black'} />
        </View>
      )}
    </View>
  );
}
