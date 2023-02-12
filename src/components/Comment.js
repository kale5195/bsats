import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SpecialView } from 'react-native-scroll-to-element';

import useTailwind from '~/hooks/useTailwind';
import PostDesc from './PostDesc';
import PostMarkdown from './PostMarkdown';
import ReplyButton from './ReplyButton';

export default function Comment({ item, idx, cid }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  const CustomView = item.id === cid ? SpecialView : View;
  const [hide, setHide] = React.useState(false);
  return (
    <CustomView
      focused={item.id === cid}
      style={tw`bg-black/3 dark:bg-white/4 ${idx > 0 ? 'ml-2' : ''} pt-2 pl-2 rounded`}>
      <PostDesc
        item={item}
        term="replies"
        isOp={item.root?.user.name === item.user.name}
        hiddenStatus={hide}
        hideComment={() => {
          setHide(!hide);
        }}
      />
      <View style={tw`${hide ? 'hidden' : ''}`}>
        <PostMarkdown text={item.text} style={tw`mt-1 pr-1`} />
        <ReplyButton item={item} />
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
            <Text style={tw`text-center font-bold text-neutral-500 dark:text-neutral-400`}>view replies</Text>
          </TouchableOpacity>
        )}
      </View>
    </CustomView>
  );
}
