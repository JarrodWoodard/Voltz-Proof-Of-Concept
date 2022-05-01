import { gql } from "apollo-server-core";

export type QueryFields = Record<string, never>;

export const typeDefs = gql`
  type Query {
    # api
    api: Api!

    # options
    option(id: OptionID!): Option!
    options(filter: OptionFilter, pagination: Pagination): OptionWithPagination!

    # polls
    poll(id: PollID!): Poll!
    polls(filter: PollFilter, pagination: Pagination): PollWithPagination!

    # users
    user(id: UserID!): User!
    users(filter: UserFilter, pagination: Pagination): UserWithPagination!

    # votes
    vote(id: VoteID!): Vote!
    votes(filter: VoteFilter, pagination: Pagination): VoteWithPagination!
  }
`;
