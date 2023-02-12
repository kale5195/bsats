import _ from 'lodash';

import { MORE_FLAT_COMMENTS, TOP_COMMENTS } from '~/fragments/comments';
import { ITEMS, ITEM_FULL, ITEM_SEARCH, RELATED_ITEMS, TOP_ITEMS } from '~/fragments/items';
import { CREATE_INVOICE, CREATE_LINK, CREAT_COMMENT, CREAT_DISCUSSION, TIP_MUTATION } from '~/fragments/mutations';
import { SUB_ITEMS } from '~/fragments/subs';
import { ME_SSR, TOP_USERS, USER_FULL, USER_SEARCH } from '~/fragments/users';
import { WALLET_HISTORY } from '~/fragments/wallet';
import useGraphInfiniteRequest from '~/services/useGraphInfiniteRequest';
import useGraphQuery from '~/services/useGraphQuery';

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
  searchUsers: (username) => {
    return useGraphQuery(
      ['search-users', username],
      USER_SEARCH,
      { q: username, limit: 10 },
      { enabled: !_.isEmpty(username) }
    );
  },
  search: (v) => useGraphInfiniteRequest(['search-list', v], ITEM_SEARCH, v, 'search', 'items', !_.isEmpty(v?.q)),
  subs: (v) => useGraphInfiniteRequest(['sub-list', v], SUB_ITEMS, v, 'SubRecent'),
  comments: (v) => useGraphInfiniteRequest(['comment-list', v], MORE_FLAT_COMMENTS, v, 'moreFlatComments', 'comments'),
  post: (id) => useGraphQuery(['single-posts', `${id}`], ITEM_FULL, { id }, { enabled: Boolean(id) }),
  relatedPosts: (id, limit) => useGraphQuery(['related-posts', id], RELATED_ITEMS, { id, limit }),
  user: (name) => useGraphQuery(['user', name], USER_FULL, { name }),
  me: () => useGraphQuery(['me'], ME_SSR, {}, { staleTime: 1000 * 5 }),
  getUser: (name) => useGraphQuery(['user', name], USER_FULL, { name }, { plain: true }),
  topItems: (key, v) => {
    return useGraphInfiniteRequest(
      [`top-${key}`, v],
      topKeyMap[key].query,
      v,
      topKeyMap[key].entityKey,
      topKeyMap[key].itemKey
    );
  },
  tip: (v) => useGraphQuery(['tip'], TIP_MUTATION, v, { plain: true }),
  createComment: (v) => useGraphQuery(['create-comment'], CREAT_COMMENT, v, { plain: true }),
  createLink: (v) => useGraphQuery(['create-link'], CREATE_LINK, v, { plain: true }),
  createDiscussion: (v) => useGraphQuery(['create-discussion'], CREAT_DISCUSSION, v, { plain: true }),
  createInvoice: (v) => useGraphQuery(['create-invoice'], CREATE_INVOICE, v, { plain: true }),
  getWalletHistory: (v) => useGraphInfiniteRequest(['wallet-history', v], WALLET_HISTORY, v, 'walletHistory', 'facts'),
};
