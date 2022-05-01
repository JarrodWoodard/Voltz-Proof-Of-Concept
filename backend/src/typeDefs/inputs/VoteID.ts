import { gql } from "apollo-server-core";
import { VotePropsPrimary } from "../../models/Vote";

export type VoteID = VotePropsPrimary;

export const typeDefs = gql`
  input VoteID {
    voteId: String!
  }
`;
