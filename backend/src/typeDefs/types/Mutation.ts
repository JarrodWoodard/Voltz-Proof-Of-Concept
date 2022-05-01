import { gql } from "apollo-server-core";

export type MutationFields = Record<string, never>;

export const typeDefs = gql`
  type Mutation {
    userConnect(input: UserConnectInput!): User!

    pollCreate(input: PollCreateInput!): Poll!

    voteCreate(input: VoteCreateInput!): Vote!
  }
`;
