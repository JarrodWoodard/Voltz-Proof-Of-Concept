import { gql } from "apollo-server-core";

export interface UserConnectInput {
  address: string;
  publicKey: string;
}

export const typeDefs = gql`
  input UserConnectInput {
    address: String!
    publicKey: String!
  }
`;
