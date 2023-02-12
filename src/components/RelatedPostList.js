import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import FixedTouchableOpacity from './FixedTouchableOpacity';

export default function RelatedPostList({ items }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <View style={tw`p-2 mt-4 mb-20 rounded-md border-t border-zinc-200 dark:border-zinc-700`}>
      <Text style={tw`text-sm mt-2 font-medium text-neutral-600 dark:text-gray-50`}>Related Posts</Text>
      {items.map((item) => {
        return (
          <FixedTouchableOpacity
            key={item.id}
            style={tw`py-2 flex-row`}
            onPress={() => {
              navigation.push('PostScreen', {
                id: item.id,
              });
            }}>
            <Text style={tw`text-xs text-neutral-600 font-semibold dark:text-gray-50`}>
              • {item.title?.slice(0, 128)} <Text style={tw`text-sky-600 font-normal`}>@{item.user.name}</Text>
            </Text>
          </FixedTouchableOpacity>
        );
      })}
    </View>
  );
}
