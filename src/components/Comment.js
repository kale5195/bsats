import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import PostDesc from './PostDesc';
import PostMarkdown from './PostMarkdown';
import { useStores } from '~/stores';

export default function Comment({ item, idx, cid }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const { uiStore } = useStores();
  return (
    <View
      style={tw`bg-black/3 dark:bg-white/4 ml-2 pt-2 pl-2 rounded`}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        console.log(item.id, cid, layout.y, layout.height);
        if (cid === item.id) {
          uiStore.setCommentY(layout.y);
        }
      }}>
      <PostDesc item={item} term="replies" showEye isOp={item.root?.user.name === item.user.name} />
      <PostMarkdown text={item.text} style={tw`mt-1 pr-1`} />
      {idx <= 8 ? (
        item.comments.map((it) => {
          return <Comment key={it.id} item={it} idx={idx + 1} cid={cid} />;
        })
      ) : (
        <TouchableOpacity
          style={tw`pt-2 pb-4`}
          onPress={() => {
            navigation.push('PostScreen', {
              id: item.id,
            });
          }}>
          <Text style={tw`text-center font-bold text-neutral-500`}>view replies</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
