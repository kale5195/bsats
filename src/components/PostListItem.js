import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import PostDesc from '~/components/PostDesc';
import PostUrl from '~/components/PostUrl';
import FixedTouchableOpacity from './FixedTouchableOpacity';

export default function PostListItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <FixedTouchableOpacity
      key={item.id}
      style={tw`p-2`}
      onPress={() => {
        navigation.push('PostScreen', {
          id: item.id,
        });
      }}>
      <Text style={tw`text-base text-neutral-800 font-semibold dark:text-gray-50`}>{item.title?.slice(0, 128)}</Text>
      <PostUrl url={item.url} />
      <PostDesc item={item} />
    </FixedTouchableOpacity>
  );
}
