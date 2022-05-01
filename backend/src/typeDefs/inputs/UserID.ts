import { gql } from "apollo-server-core";
import { UserPropsPrimary } from "../../models/User";

export type UserID = UserPropsPrimary;

export const typeDefs = gql`
  input UserID {
    address: String!
  }
`;
