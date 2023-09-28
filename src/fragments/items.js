import { gql } from 'graphql-request';

import { COMMENTS } from './comments';

export const ITEM_FIELDS = gql`
  fragment ItemFields on Item {
    id
    parentId
    createdAt
    deletedAt
    title
    url
    user {
      name
      streak
      hideCowboyHat
      id
    }
    otsHash
    position
    sats
    boost
    bounty
    bountyPaidTo
    path
    upvotes
    meSats
    meDontLike
    meBookmark
    meSubscription
    meForward
    outlawed
    freebie
    ncomments
    commentSats
    lastCommentAt
    maxBid
    isJob
    company
    location
    remote
    subName
    pollCost
    status
    uploadId
    mine
  }
`;

export const ITEMS = gql`
  ${ITEM_FIELDS}
  query SubItems(
    $sub: String
    $sort: String
    $cursor: String
    $type: String
    $name: String
    $when: String
    $by: String
    $limit: Int
  ) {
    items(sub: $sub, sort: $sort, cursor: $cursor, type: $type, name: $name, when: $when, by: $by, limit: $limit) {
      cursor
      items {
        ...ItemFields
        position
      }
      pins {
        ...ItemFields
        position
      }
    }
  }
`;

export const ITEM = gql`
  ${ITEM_FIELDS}
  query Item($id: ID!) {
    item(id: $id) {
      ...ItemFields
      text
    }
  }
`;

export const COMMENTS_QUERY = gql`
  ${COMMENTS}
  query Comments($id: ID!, $sort: String) {
    comments(id: $id, sort: $sort) {
      ...CommentsRecursive
    }
  }
`;

export const ITEM_FULL = gql`
  ${ITEM_FIELDS}
  ${COMMENTS}
  query Item($id: ID!) {
    item(id: $id) {
      ...ItemFields
      prior
      position
      text
      poll {
        meVoted
        count
        options {
          id
          option
          count
          meVoted
        }
      }
      comments {
        ...CommentsRecursive
      }
    }
  }
`;

export const ITEM_WITH_COMMENTS = gql`
  ${ITEM_FIELDS}
  ${COMMENTS}
  fragment ItemWithComments on Item {
    ...ItemFields
    text
    comments {
      ...CommentsRecursive
    }
  }
`;

export const ITEM_SEARCH = gql`
  ${ITEM_FIELDS}
  query Search($q: String, $cursor: String, $sort: String, $what: String, $when: String) {
    search(q: $q, cursor: $cursor, sort: $sort, what: $what, when: $when) {
      cursor
      items {
        ...ItemFields
        text
        searchTitle
        searchText
      }
    }
  }
`;

export const TOP_ITEMS = gql`
  ${ITEM_FIELDS}
  query topItems($sort: String, $cursor: String, $when: String = "day") {
    topItems(sort: $sort, cursor: $cursor, when: $when) {
      cursor
      items {
        ...ItemFields
        position
      }
      pins {
        ...ItemFields
        position
      }
    }
  }
`;

export const RELATED_ITEMS_WITH_ITEM = gql`
  ${ITEM_FIELDS}
  query Related($title: String, $id: ID, $cursor: String, $limit: Int) {
    item(id: $id) {
      ...ItemFields
    }
    related(title: $title, id: $id, cursor: $cursor, limit: $limit) {
      cursor
      items {
        ...ItemFields
      }
    }
  }
`;

export const RELATED_ITEMS = gql`
  ${ITEM_FIELDS}
  query Related($title: String, $id: ID, $cursor: String, $limit: Int) {
    related(title: $title, id: $id, cursor: $cursor, limit: $limit) {
      cursor
      items {
        ...ItemFields
      }
    }
  }
`;
