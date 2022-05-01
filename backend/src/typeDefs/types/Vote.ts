import { gql } from "apollo-server-core";
import { VoteProps } from "../../models/Vote";

export type VoteFields = VoteProps;

export const typeDefs = gql`
  type Vote {
    # fields
    voteId: String!
    pollId: String!
    optionId: String!
    voterAddress: String!
    payload: String!
    signature: String!
    voterBalance: Float!

    # edges
    poll: Poll!
    option: Option!
    voter: User!
  }
`;
