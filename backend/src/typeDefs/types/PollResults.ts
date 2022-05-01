import { gql } from "apollo-server-core";
import { PollsResultsResultFields } from "./PollsResultsResult";

export interface PollResultsFields {
  voteCount: number;
  voteBalance: number;
  voteResults: PollsResultsResultFields[];
}

export const typeDefs = gql`
  type PollResults {
    voteCount: Int!
    voteBalance: Float!
    voteResults: [PollsResultsResult!]!
  }
`;
