import React from 'react';
import { Text, View } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommentItem from './CommentListItem';
import CommonList from './CommonList';
import Dropdown from './Dropdown';
import PostItem from './PostListItem';
import UserItem from './UserListItem';

const topData = ['posts', 'comments', 'users'];
const byData = {
  posts: ['votes', 'comments', 'sats'],
  comments: ['votes', 'comments', 'sats'],
  users: ['stacked', 'spent', 'comments', 'posts'],
};
const forData = ['day', 'week', 'month', 'year', 'forever'];

const componentMap = {
  posts: {
    item: PostItem,
    idKey: 'id',
  },
  comments: {
    item: CommentItem,
    idKey: 'id',
  },
  users: {
    item: UserItem,
    idKey: 'name',
  },
};
export default function TopList() {
  const { tw } = useTailwind();
  const [params, setParams] = React.useState({ top: 'posts', by: 'votes', for: 'day' });
  const [byParams, setByParams] = React.useState({
    posts: 'votes',
    comments: 'votes',
    users: 'stacked',
  });
  const queryRes = StackerNews.topItems(params.top, { sort: byParams[params.top], when: params.for });
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-row justify-between px-2 items-center py-2`}>
        <Text style={tw`mr-1 dark:text-neutral-100`}>top</Text>
        <Dropdown data={topData} defaultValue={params.top} setParams={setParams} cat="top" />
        <Text style={tw`mx-1 dark:text-neutral-100`}>by</Text>
        <Dropdown
          data={byData[params.top]}
          defaultValue={byParams[params.top]}
          setParams={setByParams}
          cat={params.top}
        />
        <Text style={tw`mx-1 dark:text-neutral-100`}>for</Text>
        <Dropdown data={forData} defaultValue={params.for} setParams={setParams} cat="for" />
      </View>
      <CommonList queryRes={queryRes} ListItem={componentMap[params.top].item} idKey={componentMap[params.top].idKey} />
    </View>
  );
}
