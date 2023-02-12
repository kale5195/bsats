import React from 'react';
import { Button, Text, View } from 'react-native';

import { ITEM } from '~/fragments/items';
import useTailwind from '~/hooks/useTailwind';
import { useStores } from '~/stores';
import FixedTouchableOpacity from '~/components/FixedTouchableOpacity';

export default function HistoryScreen({ navigation }) {
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
}
