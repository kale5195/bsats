import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import PostDesc from './PostDesc';
import PostMarkdown from './PostMarkdown';

export default function Comment({ item, idx }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <View style={tw`bg-black/3 dark:bg-white/4 ml-2 pt-2 pl-2 rounded`}>
      <PostDesc item={item} term="replies" showEye isOp={item.root?.user.name === item.user.name} />
      <PostMarkdown text={item.text} style={tw`mt-1 pr-1`} />
      {idx <= 8 ? (
        item.comments.map((it) => {
          return <Comment key={it.id} item={it} idx={idx + 1} />;
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
