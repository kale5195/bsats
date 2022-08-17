import { useInfiniteQuery } from 'react-query';
import { request } from 'graphql-request';

export default function useGraphInfiniteRequest(key, query, variable, entityKey = 'items', itemKey = 'items') {
  const { data, ...rest } = useInfiniteQuery(
    key,
    ({ pageParam }) => {
      // console.log(key, pageParam);
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
    }
  );
  return {
    queryKeys: key,
    data: (data?.pages || []).map((v) => v?.[entityKey]?.[itemKey]).flat(),
    ...rest,
  };
}
