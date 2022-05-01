import { gql } from "apollo-server-core";

export interface PollFilterLikes {
  pollId?: string;
  title?: string;
  description?: string;
  creatorAddress?: string;
  payload?: string;
  signature?: string;
}

export const typeDefs = gql`
  input PollFilterLikes {
    pollId: String
    title: String
    description: String
    creatorAddress: String
    payload: String
    signature: String
  }
`;
