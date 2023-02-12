import { ActivityIndicator, ScrollView } from 'react-native';

import useTailwind from '~/hooks/useTailwind';
import { StackerNews } from '~/services/api';
import UserListItem from './UserListItem';

export default function UserList({ username }) {
  const { tw } = useTailwind();
  const { data, isLoading } = StackerNews.searchUsers(username);
  if (isLoading) {
    return <ActivityIndicator color="#c9c9c9" style={tw`mt-2`} size="large" />;
  }
  return (
    <ScrollView style={tw`flex-1 mb-8`}>
      {data.searchUsers?.map((item) => {
        return <UserListItem item={item} key={item.name} />;
      })}
    </ScrollView>
  );
}
