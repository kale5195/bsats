import { useInfiniteQuery } from 'react-query';
import { request } from 'graphql-request';

export default function useGraphInfiniteRequest(
  key,
  query,
  variable,
  entityKey = 'items',
  itemKey = 'items',
  enabled = true
) {
  const { data, ...rest } = useInfiniteQuery(
    key,
    ({ pageParam }) => {
      // console.log('useGraphInfiniteRequest', key);
      return request('https://stacker.news/api/graphql', query, { cursor: pageParam, ...variable });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const cursor = lastPage?.[entityKey]?.cursor;
        if (!cursor) {
          return null;
        }
        return cursor;
      },
      enabled,
    }
  );
  return {
    queryKeys: key,
    data: (data?.pages || []).map((v) => v?.[entityKey]?.[itemKey]).flat(),
    ...rest,
  };
}
