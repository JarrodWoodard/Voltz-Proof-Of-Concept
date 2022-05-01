import { gql } from "apollo-server-core";
import { PollTypeEnum } from "../enums/PollTypeEnum";

export interface PollFilterIncludes {
  pollId?: string[];
  title?: string[];
  description?: string[];
  creatorAddress?: string[];
  payload?: string[];
  signature?: string[];
  minimalBalanceRequiredToVote?: number[];
  expired?: boolean[];
  expirationDate?: Date[];
  expirationBlockQuote?: number[];
  pollType?: PollTypeEnum[];
}

export const typeDefs = gql`
  input PollFilterIncludes {
    pollId: [String!]
    title: [String!]
    description: [String!]
    creatorAddress: [String!]
    payload: [String!]
    signature: [String!]
    minimalBalanceRequiredToVote: [Float!]
    expired: [Boolean!]
    expirationDate: [DateTime!]
    expirationBlockQuote: [Int!]
    pollType: [PollTypeEnum!]
  }
`;
