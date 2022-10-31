import { gql } from 'graphql-request';
import { COMMENT_FIELDS } from './comments';
import { ITEM_FIELDS, ITEM_WITH_COMMENTS } from './items';

export const ME = gql`
  {
    me {
      id
      name
      sats
      stacked
      freePosts
      freeComments
      hasNewNotes
      tipDefault
      bioId
      hasInvites
      upvotePopover
      tipPopover
      noteItemSats
      noteEarning
      noteAllDescendants
      noteMentions
      noteDeposits
      noteInvites
      noteJobIndicator
      lastCheckedJobs
    }
  }
`;

export const ME_SSR = gql`
  {
    me {
      id
      name
      sats
      stacked
      freePosts
      freeComments
      tipDefault
      bioId
      upvotePopover
      tipPopover
      noteItemSats
      noteEarning
      noteAllDescendants
      noteMentions
      noteDeposits
      noteInvites
      noteJobIndicator
      lastCheckedJobs
    }
  }
`;

export const SETTINGS = gql`
  {
    settings {
      tipDefault
      noteItemSats
      noteEarning
      noteAllDescendants
      noteMentions
      noteDeposits
      noteInvites
      noteJobIndicator
      authMethods {
        lightning
        email
        twitter
        github
      }
    }
  }
`;

export const NAME_QUERY = gql`
  query nameAvailable($name: String!) {
    nameAvailable(name: $name)
  }
`;

export const NAME_MUTATION = gql`
  mutation setName($name: String!) {
    setName(name: $name)
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    createdAt
    name
    nitems
    ncomments
    stacked
    sats
    photoId
    bio {
      ...ItemFields
      text
    }
  }
`;

export const TOP_USERS = gql`
  query TopUsers($cursor: String, $when: String = "day", $sort: String) {
    topUsers(cursor: $cursor, when: $when, sort: $sort) {
      users {
        name
        photoId
        stacked(when: $when)
        spent(when: $when)
        ncomments(when: $when)
        nitems(when: $when)
      }
      cursor
    }
  }
`;

export const USER_FULL = gql`
  ${USER_FIELDS}
  ${ITEM_WITH_COMMENTS}
  query User($name: String!) {
    user(name: $name) {
      ...UserFields
      bio {
        ...ItemWithComments
      }
    }
  }
`;

export const USER_WITH_COMMENTS = gql`
  ${USER_FIELDS}
  ${COMMENT_FIELDS}
  query UserWithComments($name: String!) {
    user(name: $name) {
      ...UserFields
    }
    moreFlatComments(sort: "user", name: $name) {
      cursor
      comments {
        ...CommentFields
      }
    }
  }
`;

export const USER_WITH_POSTS = gql`
  ${USER_FIELDS}
  ${ITEM_FIELDS}
  query UserWithPosts($name: String!) {
    user(name: $name) {
      ...UserFields
    }
    items(sort: "user", name: $name) {
      cursor
      items {
        ...ItemFields
      }
    }
  }
`;

export const USER_SEARCH = gql`
  query searchUsers($q: String!, $limit: Int, $similarity: Float) {
    searchUsers(q: $q, limit: $limit, similarity: $similarity) {
      name
      photoId
      stacked
      spent
      ncomments
      nitems
    }
  }
`;
