import { gql } from "apollo-server-core";

export interface VoteCreateInput {
  voteId: string;
  pollId: string;
  optionId: string;
  voterAddress: string;
  payload: string;
  signature: string;
}

export const typeDefs = gql`
  input VoteCreateInput {
    voteId: String!
    pollId: String!
    optionId: String!
    voterAddress: String!
    payload: String!
    signature: String!
  }
`;
