import useGraphInfiniteRequest from '~/services/useGraphInfiniteRequest';
import useGraphQuery from '~/services/useGraphQuery';
import { ITEMS, ITEM_FULL, TOP_ITEMS } from '~/fragments/items';
import { USER_FULL, TOP_USERS } from '~/fragments/users';
import { CREATE_AUTH, LN_AUTH } from '~/fragments/auth';
import { MORE_FLAT_COMMENTS, TOP_COMMENTS } from '~/fragments/comments';

const topKeyMap = {
  posts: {
    query: TOP_ITEMS,
    entityKey: 'topItems',
    itemKey: 'items',
  },
  comments: {
    query: TOP_COMMENTS,
    entityKey: 'topComments',
    itemKey: 'comments',
  },
  users: {
    query: TOP_USERS,
    entityKey: 'topUsers',
    itemKey: 'users',
  },
};
export const StackerNews = {
  posts: (v) => useGraphInfiniteRequest(['post-list', v], ITEMS, v),
  topItems: (key, v) => {
    return useGraphInfiniteRequest(
      [`top-${key}`, v],
      topKeyMap[key].query,
      v,
      topKeyMap[key].entityKey,
      topKeyMap[key].itemKey
    );
  },
  comments: (v) => useGraphInfiniteRequest(['comment-list', v], MORE_FLAT_COMMENTS, v, 'moreFlatComments', 'comments'),
  post: (id) => useGraphQuery(['single-posts', id], ITEM_FULL, { id }),
  user: (name) => useGraphQuery(['user', name], USER_FULL, { name }),
  getUser: (name) => useGraphQuery(['user', name], USER_FULL, { name }, { plain: true }),
  login: (key) => useGraphQuery(['login', key], CREATE_AUTH, {}),
  checkAuth: (k1) => useGraphQuery(['lnauth', k1], LN_AUTH, { k1 }, { plain: true }),
};
