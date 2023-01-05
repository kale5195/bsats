import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import Comment from './Comment';
import PostMarkdown from './PostMarkdown';

export default function Bio({ name }) {
  const { tw } = useTailwind();
  const { data } = StackerNews.user(name);
  const { data: postData, isLoading } = StackerNews.post(data?.user?.bioId);
  return isLoading ? (
    <View>
      <ActivityIndicator color="#c9c9c9" style={tw`mt-2`} size="large" />
    </View>
  ) : (
    <ScrollView style={tw`flex-1 pb-10`}>
      <PostMarkdown text={postData?.item?.text} style={tw`my-2 px-2`} />
      {postData?.item?.comments?.map((it) => {
        return <Comment item={it} key={it.id} idx={0} />;
      })}
      {postData?.item?.text && (
        <View style={tw`py-5`}>
          <Text style={tw`text-center py-5 dark:text-gray-50`}>END</Text>
        </View>
      )}
    </ScrollView>
  );
}
