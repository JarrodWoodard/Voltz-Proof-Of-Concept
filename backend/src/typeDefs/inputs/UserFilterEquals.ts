import { gql } from "apollo-server-core";

export interface UserFilterEquals {
  address?: string;
  publicKey?: string;
}

export const typeDefs = gql`
  input UserFilterEquals {
    address: String
    publicKey: String
  }
`;
