import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';

export default function ProfileHeader({ name }) {
  const { tw } = useTailwind();
  const { data, isLoading } = StackerNews.user(name);
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator color="#c9c9c9" style={tw`mt-2`} size="large" />;
  }
  return (
    <View style={tw`flex-row py-2 pl-2`}>
      <Image
        resizeMode="contain"
        source={{
          uri: data?.user?.photoId
            ? `https://snuploads.s3.amazonaws.com/${data?.user?.photoId}`
            : 'https://stacker.news/dorian400.jpg',
        }}
        style={tw`ml-2 w-[100px] h-[100px] rounded-lg`}
      />
      <View style={tw`mx-4 flex-col justify-center flex-1`}>
        <Text style={tw`text-base text-black font-bold dark:text-white`}>@{data?.user?.name}</Text>
        <Text style={tw`mt-1 text-base text-lime-700 font-bold`}>{data?.user?.stacked} stacked</Text>
        <TouchableOpacity
          style={tw`bg-amber-300 px-3 py-2 rounded-md mt-1`}
          onPress={() =>
            navigation.navigate('QRcodeScreen', {
              name: data?.user?.name,
            })
          }>
          <Text style={tw`text-sm text-black font-bold text-center`} numberOfLines={1}>
            ⚡{data?.user?.name}@stacker.news
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
