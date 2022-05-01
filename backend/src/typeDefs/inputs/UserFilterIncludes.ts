import { gql } from "apollo-server-core";

export interface UserFilterIncludes {
  address?: string[];
  publicKey?: string[];
}

export const typeDefs = gql`
  input UserFilterIncludes {
    address: [String!]
    publicKey: [String!]
  }
`;
