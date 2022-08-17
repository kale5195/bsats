import useGraphInfiniteRequest from '~/services/useGraphInfiniteRequest';
import useGraphQuery from '~/services/useGraphQuery';
import { ITEMS, ITEM_FULL } from '~/fragments/items';
import { USER_FULL } from '~/fragments/users';
import { CREATE_AUTH, LN_AUTH } from '~/fragments/auth';
import { MORE_FLAT_COMMENTS } from '~/fragments/comments';

export const StackerNews = {
  posts: (v) => useGraphInfiniteRequest(['post-list', v], ITEMS, v),
  comments: (v) => useGraphInfiniteRequest(['comment-list', v], MORE_FLAT_COMMENTS, v, 'moreFlatComments', 'comments'),
  post: (id) => useGraphQuery(['single-posts', id], ITEM_FULL, { id }),
  user: (name) => useGraphQuery(['user', name], USER_FULL, { name }),
  getUser: (name) => useGraphQuery(['user', name], USER_FULL, { name }, { plain: true }),
  login: (key) => useGraphQuery(['login', key], CREATE_AUTH, {}),
  checkAuth: (k1) => useGraphQuery(['lnauth', k1], LN_AUTH, { k1 }, { plain: true }),
};
