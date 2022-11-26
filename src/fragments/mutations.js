import { gql } from 'graphql-request';

export const TIP_MUTATION = gql`
  mutation act($id: ID!, $sats: Int!) {
    act(id: $id, sats: $sats) {
      vote
      sats
    }
  }
`;
