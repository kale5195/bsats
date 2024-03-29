import * as WebBrowser from 'expo-web-browser';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SpecialScrollView } from 'react-native-scroll-to-element';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import { useStores } from '~/stores';
import Comment from '~/components/Comment';
import Container from '~/components/Container';
import PollView from '~/components/PollView';
import PostDesc from '~/components/PostDesc';
import PostMarkdown from '~/components/PostMarkdown';
import PostUrl from '~/components/PostUrl';
import RelatedPostList from '~/components/RelatedPostList';
import ReplyButton from '~/components/ReplyButton';

function PostScreen({ route, navigation }) {
  const { tw } = useTailwind();
  const { postStore } = useStores();
  const { id, cid } = route.params;
  const { data, isLoading, refetch } = StackerNews.post(id);
  // const { data: relatedData, isLoading: relatedDataLoading } = StackerNews.relatedPosts(id, 5);
  return (
    <Container>
      <View
        style={tw`py-2 dark:bg-black bg-[#EFEFEF] flex-row justify-between items-center border-b border-zinc-200 dark:border-zinc-900`}>
        <TouchableOpacity
          style={tw`px-2 mr-4`}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons size={28} style={tw`text-gray-600 dark:text-neutral-100`} name="arrow-back-outline" />
        </TouchableOpacity>
        <View style={tw`flex-1 items-center`}>
          <Text style={tw`dark:text-white font-medium text-base`}>Post</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => {
              postStore.toggleFavPosts({ pid: id, title: data?.item?.title?.trim() });
            }}>
            <FontAwesome
              size={22}
              style={tw`pr-2 text-gray-600 dark:text-neutral-100`}
              name={`${postStore.isFavPost(id) ? 'star' : 'star-o'}`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // WebBrowser.openBrowserAsync(`https://stacker.news/items/${route.params.id}`);
              navigation.push('ExternalLinkScreen', {
                url: `https://stacker.news/items/${route.params.id}`,
              });
            }}>
            <Feather size={22} style={tw`px-2 text-gray-600 dark:text-neutral-100`} name="external-link" />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAwareScrollView extraScrollHeight={65} enableOnAndroid={true}>
        {isLoading ? (
          <ActivityIndicator color="#c9c9c9" style={tw`mt-2`} size="large" />
        ) : (
          <SpecialScrollView scrollToOverflowEnabled={true} style={tw`flex-1 p-2`} scrollIndicatorInsets={{ right: 1 }}>
            <Text style={tw`text-base text-neutral-800 dark:text-gray-50 font-semibold px-2`}>
              {data.item.title?.trim()?.slice(0, 128)}
            </Text>
            <View style={tw`px-2`}>
              <PostUrl url={data.item.url} />
              <PostDesc item={data.item} />
            </View>
            <PostMarkdown text={data.item.text} style={tw`mt-2 px-2`} />
            <PollView poll={data.item?.poll} />
            <View style={tw`mt-1 mx-2`}>
              <ReplyButton item={data.item} />
            </View>

            {data.item.comments.map((it) => {
              return <Comment item={it} key={it.id} idx={0} cid={cid} />;
            })}

            <View style={tw`mb-5`}>
              <Text style={tw`text-center py-5 dark:text-gray-50`}>END</Text>
            </View>
            {/* {!relatedDataLoading && <RelatedPostList items={relatedData?.related?.items} />} */}
          </SpecialScrollView>
        )}
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default observer(PostScreen);
