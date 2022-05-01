import { gql } from "apollo-server-core";
import { PollTypeEnum } from "../enums/PollTypeEnum";

export interface PollFilterEquals {
  pollId?: string;
  title?: string;
  description?: string;
  creatorAddress?: string;
  payload?: string;
  signature?: string;
  minimalBalanceRequiredToVote?: number;
  expired?: boolean;
  expirationDate?: Date;
  expirationBlockQuote?: number;
  pollType?: PollTypeEnum;
}

export const typeDefs = gql`
  input PollFilterEquals {
    pollId: String
    title: String
    description: String
    creatorAddress: String
    payload: String
    signature: String
    minimalBalanceRequiredToVote: Float
    expired: Boolean
    expirationDate: DateTime
    expirationBlockQuote: Int
    pollType: PollTypeEnum
  }
`;
