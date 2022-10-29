import { View } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from './CommonList';
import PostItem from './PostListItem';

export default function PostList({ v }) {
  const { tw } = useTailwind();
  const queryRes = StackerNews.posts({ ...v });

  return (
    <View style={tw`flex-1`}>
      <CommonList queryRes={queryRes} ListItem={PostItem} />
    </View>
  );
}
