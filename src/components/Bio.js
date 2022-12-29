import React from 'react';
import { View, ScrollView } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import Comment from './Comment';
import PostMarkdown from './PostMarkdown';
import ReplyButton from './ReplyButton';

export default function Bio({ name }) {
  const { tw } = useTailwind();
  const { data } = StackerNews.user(name);
  return (
    <ScrollView style={tw`flex-1 px-1`}>
      <PostMarkdown text={data?.user?.bio?.text} style={tw`mt-2 px-2`} />
      {data?.user?.bio?.text && (
        <View style={tw`px-2`}>
          <ReplyButton />
        </View>
      )}
      {data?.user?.bio?.comments?.map((it) => {
        return <Comment item={it} key={it.id} idx={0} />;
      })}
    </ScrollView>
  );
}
