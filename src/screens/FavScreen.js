import React from 'react';
import { View, Button, Text } from 'react-native';
import { useStores } from '~/stores';
import useTailwind from '~/hooks/useTailwind';
import FixedTouchableOpacity from '~/components/FixedTouchableOpacity';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import { fromNow } from '~/utils/dateUtils';

export default FavScreen = observer(({ navigation }) => {
  const { tw } = useTailwind();
  const { postStore } = useStores();

  return (
    <FlashList
      renderItem={({ item }) => {
        return (
          <FixedTouchableOpacity
            key={item.pid}
            style={tw`p-2 flex justify-between`}
            onPress={() => {
              navigation.push('PostScreen', {
                id: item.pid,
              });
            }}>
            <Text style={tw`text-base text-neutral-800 font-semibold dark:text-gray-50`}>{item.title}</Text>
          </FixedTouchableOpacity>
        );
      }}
      estimatedItemSize={50}
      data={postStore.favPosts.slice()}
    />
  );
});
