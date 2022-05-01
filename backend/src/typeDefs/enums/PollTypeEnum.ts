import { gql } from "apollo-server-core";
import { PollType } from "../../@types/PollType";

export type PollTypeEnum = PollType;

export const typeDefs = gql`
  enum PollTypeEnum {
    USER_VOTES
    USER_BALANCE
  }
`;
