import { gql } from "apollo-server-core";

export interface VoteFilterLikes {
  voteId?: string;
  pollId?: string;
  optionId?: string;
  voterAddress?: string;
  payload?: string;
  signature?: string;
}

export const typeDefs = gql`
  input VoteFilterLikes {
    voteId: String
    pollId: String
    optionId: String
    voterAddress: String
    payload: String
    signature: String
  }
`;
