import { gql } from "apollo-server-core";
import { UserProps } from "../../models/User";

export type UserFields = UserProps;

export const typeDefs = gql`
  type User {
    # fields
    address: String!
    publicKey: String!

    # edges
    polls: [Poll!]!
    votes: [Vote!]!
  }
`;
