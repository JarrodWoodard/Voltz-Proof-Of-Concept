import { gql } from "apollo-server-core";

export interface UserFilterLikes {
  address?: string;
  publicKey?: string;
}

export const typeDefs = gql`
  input UserFilterLikes {
    address: String
    publicKey: String
  }
`;
