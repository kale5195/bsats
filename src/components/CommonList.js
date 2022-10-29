import { useRef } from 'react';
import { RefreshControl, ActivityIndicator, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useScrollToTop } from '@react-navigation/native';
import useTailwind from '~/hooks/useTailwind';
import { queryClient } from '~/services/queryClient';

export default function CommonList({ queryRes, ListHeaderComponent, ListItem, idKey = 'id' }) {
  const { data, fetchNextPage, isFetching, hasNextPage, refetch, isLoading, queryKeys } = queryRes;
  const { tw } = useTailwind();
  const ref = useRef(null);
  useScrollToTop(ref);
  const onRefresh = () => {
    queryClient.setQueryData(queryKeys, (data) => ({
      pages: data.pages.slice(0, 1),
      pageParams: data.pageParams.slice(0, 1),
    }));
    refetch();
  };
  if (isLoading) {
    return <ActivityIndicator color="#c9c9c9" style={tw`mt-2`} size="large" />;
  }

  return (
    <FlashList
      ref={ref}
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item) => {
        return item[idKey].toString();
      }}
      renderItem={({ item }) => <ListItem item={item} />}
      estimatedItemSize={70}
      refreshControl={<RefreshControl tintColor="#c9c9c9" refreshing={isLoading} onRefresh={onRefresh} />}
      onEndReached={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={() => {
        if (isFetching && !isLoading) {
          return <ActivityIndicator color="#c9c9c9" style={tw`mt-1`} size="large" />;
        }
        return (
          <View style={tw`mb-[100px]`}>
            <Text style={tw`text-center py-5 dark:text-gray-50`}>No More Posts</Text>
          </View>
        );
      }}
    />
  );
}
