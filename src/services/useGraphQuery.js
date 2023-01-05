import { useQuery } from 'react-query';
import { request } from 'graphql-request';

export default function customQuery(key, query, variables, options) {
  if (options && options.plain) {
    return request('https://stacker.news/api/graphql', query, variables)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return {
          errno: -1,
          msg: error?.response?.errors?.[0]?.message,
        };
      });
  }
  return useQuery(
    key,
    () =>
      request('https://stacker.news/api/graphql', query, variables).then((res) => {
        //console.log('userGraphQuery', key);
        return res;
      }),
    {
      ...options,
    }
  );
}
