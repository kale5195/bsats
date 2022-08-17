import React from 'react';
import { View, Button, Text } from 'react-native';
import { useStores } from '~/stores';
import useTailwind from '~/hooks/useTailwind';
import Container from '~/components/Container';
import { ITEM } from '~/fragments/items';
import FixedTouchableOpacity from '~/components/FixedTouchableOpacity';

export default HistoryScreen = ({ navigation }) => {
  const { tw } = useTailwind();
  const { postStore } = useStores();

  return (
    <View style={tw`p-2`}>
      {postStore.historyPosts.map((i) => (
        <FixedTouchableOpacity
          key={i.pid}
          style={tw`p-2`}
          onPress={() => {
            navigation.push('PostScreen', {
              id: i.pid,
            });
          }}>
          <Text style={tw`text-base text-neutral-800 font-semibold dark:text-gray-50`}>{i.title}</Text>
        </FixedTouchableOpacity>
      ))}
    </View>
  );
};
