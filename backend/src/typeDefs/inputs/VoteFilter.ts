import { gql } from "apollo-server-core";
import { Filter } from "../../@types/Filter";
import { VoteFilterEquals } from "./VoteFilterEquals";
import { VoteFilterIncludes } from "./VoteFilterIncludes";
import { VoteFilterLikes } from "./VoteFilterLikes";

export type VoteFilter = Filter<
  VoteFilterEquals,
  VoteFilterIncludes,
  VoteFilterLikes
>;

export const typeDefs = gql`
  input VoteFilter {
    equals: VoteFilterEquals
    includes: VoteFilterIncludes
    likes: VoteFilterLikes
  }
`;
