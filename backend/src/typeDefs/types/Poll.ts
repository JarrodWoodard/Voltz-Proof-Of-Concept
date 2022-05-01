import { gql } from "apollo-server-core";
import { PollProps } from "../../models/Poll";

export type PollFields = PollProps;

export const typeDefs = gql`
  type Poll {
    # fields
    pollId: String!
    title: String!
    description: String!
    creatorAddress: String!
    payload: String!
    signature: String!
    minimalBalanceRequiredToVote: Float!
    expired: Boolean!
    expirationDate: DateTime
    expirationBlockQuote: Int
    pollType: PollTypeEnum!

    # edges
    creator: User!
    options: [Option!]!
    votes: [Vote!]!
    votedOption(input: VotedOptionInput!): Option
    results: PollResults!
  }
`;
