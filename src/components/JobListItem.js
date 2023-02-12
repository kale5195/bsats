import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { timeSince } from '~/lib/time';
import FixedTouchableOpacity from './FixedTouchableOpacity';

export default function JobListItem({ item }) {
  const { tw } = useTailwind();
  const navigation = useNavigation();
  return (
    <FixedTouchableOpacity
      key={item.id}
      style={tw`p-2 flex-row`}
      onPress={() => {
        navigation.push('PostScreen', {
          id: item.id,
        });
      }}>
      <Image
        resizeMode="contain"
        source={{
          uri: item?.uploadId
            ? `https://snuploads.s3.amazonaws.com/${item?.uploadId}`
            : 'https://stacker.news/dorian400.jpg',
        }}
        style={tw`w-[50px] h-[50px] rounded-full`}
      />
      <View style={tw`ml-2 flex-col flex-1 flex-wrap`}>
        <Text style={tw`text-base w-full text-neutral-800 font-semibold dark:text-gray-50`}>
          {item.title?.slice(0, 128)}
        </Text>
        <View style={tw`mt-0.5 flex-row items-center flex-wrap`}>
          <Text style={tw`mr-1 text-xs text-neutral-500`}>{item.company} \ </Text>
          <Text style={tw`mr-1 text-xs text-neutral-500`}>
            {`${item.location || ''}${item.location && item.remote ? ' or ' : ''}${item.remote ? 'Remote' : ''}`}
            {` \\`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('ProfileScreen', { name: item.user.name });
            }}>
            <Text style={tw`mr-1 text-xs text-sky-600`}>@{item.user.name}</Text>
          </TouchableOpacity>
          <Text style={tw`text-xs text-neutral-500`}>{timeSince(new Date(item.createdAt))}</Text>
        </View>
      </View>
    </FixedTouchableOpacity>
  );
}
