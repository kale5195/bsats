import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import CommonList from '~/components/CommonList';
import PostItem from '~/components/PostListItem';
import CommentItem from '~/components/CommentListItem';
import Dropdown from '~/components/Dropdown';
import UserList from '~/components/UserList';

const searchData = ['posts', 'comments', 'users'];
const byData = ['match', 'recent', 'comments', 'sats', 'votes'];
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
};

const CommonSearchList = ({ params }) => {
  const queryRes = StackerNews.search({
    what: params.search,
    sort: params.by,
    when: params.for,
    q: params.q,
  });
  return (
    <CommonList
      queryRes={queryRes}
      ListItem={componentMap[params.search].item}
      idKey={componentMap[params.search].idKey}
    />
  );
};
export default SearchScreen = observer(() => {
  const { tw } = useTailwind();
  const [params, setParams] = React.useState({ search: 'posts', by: 'match', for: 'day', q: '' });
  const [content, setContent] = React.useState('');

  const onSearchSubmit = () => {
    setParams((prev) => {
      return { ...prev, q: content };
    });
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`mt-1 flex-row justify-between px-2 items-center py-2`}>
        <TextInput
          style={tw`bg-white  dark:bg-gray-800 dark:text-gray-200 flex-1 py-2 mr-2 px-2 rounded border border-gray-300 dark:border-gray-600`}
          onChangeText={(text) => {
            setParams((prev) => {
              return { ...prev, q: '' };
            });
            setContent(text);
          }}
          placeholderTextColor="#999"
          placeholder="Please input content"
          onSubmitEditing={onSearchSubmit}
          value={content}
          clearButtonMode="always"
        />
        <TouchableOpacity onPress={onSearchSubmit}>
          <Text style={tw`font-medium w-[60px] text-center text-base text-amber-500 dark:text-amber-300`}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row justify-between px-2 items-center py-2 border-b border-gray-200 dark:border-gray-800`}>
        <Text style={tw`mr-1 dark:text-neutral-100`}>in</Text>
        <Dropdown data={searchData} defaultValue={params.search} setParams={setParams} cat="search" />
        <Text style={tw`mx-1 dark:text-neutral-100`}>by</Text>
        <Dropdown data={byData} defaultValue={params.by} setParams={setParams} cat="by" />
        <Text style={tw`mx-1 dark:text-neutral-100`}>for</Text>
        <Dropdown data={forData} defaultValue={params.for} setParams={setParams} cat="for" />
      </View>
      {params.q &&
        (params?.search === 'users' ? <UserList username={params.q} /> : <CommonSearchList params={params} />)}
    </View>
  );
});
