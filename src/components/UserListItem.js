import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import FixedTouchableOpacity from './FixedTouchableOpacity';
import { abbrNum } from '~/lib/format';

export default function UserListItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <FixedTouchableOpacity
      style={tw`px-4 py-2 flex-row items-center `}
      onPress={() => {
        navigation.push('ProfileScreen', { name: item.name });
      }}>
      <Image
        resizeMode="contain"
        source={{
          uri: item?.photoId
            ? `https://snuploads.s3.amazonaws.com/${item?.photoId}`
            : 'https://stacker.news/dorian400.jpg',
        }}
        style={tw`w-[50px] h-[50px] rounded-lg`}
      />
      <View style={tw`ml-2 flex-col`}>
        <Text style={tw`text-base font-medium dark:text-neutral-100`}>@{item.name}</Text>
        <View style={tw`mt-1 flex-row`}>
          <Text style={tw`text-xs dark:text-neutral-100`}>{abbrNum(item.stacked)} stacked \ </Text>
          <Text style={tw`text-xs dark:text-neutral-100`}>{abbrNum(item.spent)} spent \ </Text>
          <Text style={tw`text-xs dark:text-neutral-100`}>{abbrNum(item.nitems)} posts \ </Text>
          <Text style={tw`text-xs dark:text-neutral-100`}>{abbrNum(item.ncomments)} comments</Text>
        </View>
      </View>
    </FixedTouchableOpacity>
  );
}
