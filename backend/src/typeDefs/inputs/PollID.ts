import { gql } from "apollo-server-core";
import { PollPropsPrimary } from "../../models/Poll";

export type PollID = PollPropsPrimary;

export const typeDefs = gql`
  input PollID {
    pollId: String!
  }
`;
