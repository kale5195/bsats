import React from 'react';
import { View } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from './CommonList';
import PostItem from './PostListItem';
import TopHeader from './TopHeader';

export default function PostList({ showHeader = false, v }) {
  const { tw } = useTailwind();
  const [type, setType] = React.useState(showHeader ? 'day' : undefined);
  const queryRes = StackerNews.posts({ ...v, within: type });

  return (
    <View style={tw`flex-1`}>
      {showHeader && <TopHeader setType={setType} type={type} />}
      <CommonList queryRes={queryRes} ListItem={PostItem} />
    </View>
  );
}
