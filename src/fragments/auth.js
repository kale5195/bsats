import { gql } from 'graphql-request';

export const CREATE_AUTH = gql`
  mutation createAuth {
    createAuth {
      k1
      encodedUrl
    }
  }
`;

export const LN_AUTH = gql`
  query lnAuth($k1: String!) {
    lnAuth(k1: $k1) {
      pubkey
      k1
    }
  }
`;
