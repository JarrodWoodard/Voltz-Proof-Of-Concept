import { gql } from "apollo-server-core";

export interface VoteFilterIncludes {
  voteId?: string[];
  pollId?: string[];
  optionId?: string[];
  voterAddress?: string[];
  voterBalance?: number[];
  payload?: string[];
  signature?: string[];
}

export const typeDefs = gql`
  input VoteFilterIncludes {
    voteId: [String!]
    pollId: [String!]
    optionId: [String!]
    voterAddress: [String!]
    voterBalance: [Float!]
    payload: [String!]
    signature: [String!]
  }
`;
