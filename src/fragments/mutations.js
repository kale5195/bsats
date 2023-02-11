import { gql } from 'graphql-request';
import { COMMENT_FIELDS } from './comments';

export const TIP_MUTATION = gql`
  mutation act($id: ID!, $sats: Int!) {
    act(id: $id, sats: $sats) {
      vote
      sats
    }
  }
`;

export const CREAT_COMMENT = gql`
  ${COMMENT_FIELDS}
  mutation createComment($text: String!, $parentId: ID!) {
    createComment(text: $text, parentId: $parentId) {
      ...CommentFields
    }
  }
`;

export const CREATE_LINK = gql`
  mutation upsertLink($id: ID, $title: String!, $url: String!, $boost: Int, $forward: String) {
    upsertLink(id: $id, title: $title, url: $url, boost: $boost, forward: $forward) {
      id
    }
  }
`;

export const CREAT_DISCUSSION = gql`
  mutation upsertDiscussion($id: ID, $title: String!, $text: String, $boost: Int, $forward: String) {
    upsertDiscussion(id: $id, title: $title, text: $text, boost: $boost, forward: $forward) {
      id
    }
  }
`;

export const CREATE_INVOICE = gql`
  mutation createInvoice($amount: Int!) {
    createInvoice(amount: $amount) {
      id
    }
  }
`;
