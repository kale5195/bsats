import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import PostDesc from '~/components/PostDesc';
import FixedTouchableOpacity from './FixedTouchableOpacity';
import PostMarkdown from './PostMarkdown';

export default function CommentListItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <FixedTouchableOpacity
      style={tw`p-2`}
      onPress={() => {
        navigation.push('PostScreen', {
          id: item.root.id,
          cid: item.id,
        });
      }}>
      <PostDesc item={item} />
      <Text style={tw`text-xs text-neutral-500`}>on:{item.root.title?.slice(0, 128)}</Text>
      <PostMarkdown text={item.text} />
    </FixedTouchableOpacity>
  );
}
