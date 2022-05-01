import { gql } from "apollo-server-core";
import { PollTypeEnum } from "../enums/PollTypeEnum";
import { PollCreateInputOption } from "./PollCreateInputOption";

export interface PollCreateInput {
  pollId: string;
  title: string;
  description: string;
  creatorAddress: string;
  payload: string;
  signature: string;
  minimalBalanceRequiredToVote: number;
  expirationDate?: Date;
  expirationBlockQuote?: number;
  options: PollCreateInputOption[];
  pollType: PollTypeEnum;
}

export const typeDefs = gql`
  input PollCreateInput {
    pollId: String!
    title: String!
    description: String!
    creatorAddress: String!
    payload: String!
    signature: String!
    minimalBalanceRequiredToVote: Float!
    expirationDate: DateTime
    expirationBlockQuote: Int
    options: [PollCreateInputOption!]!
    pollType: PollTypeEnum!
  }
`;
