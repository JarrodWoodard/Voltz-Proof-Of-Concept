import { gql } from "apollo-server-core";

export interface PollsResultsResultFields {
  optionId: string;
  voteCount: number;
  voteBalance: number;
}

export const typeDefs = gql`
  type PollsResultsResult {
    # fields
    optionId: String!
    voteCount: Int!
    voteBalance: Float!
  }
`;
