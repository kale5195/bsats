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
