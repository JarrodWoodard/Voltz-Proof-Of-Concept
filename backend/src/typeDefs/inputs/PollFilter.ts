import { gql } from "apollo-server-core";
import { Filter } from "../../@types/Filter";
import { PollFilterEquals } from "./PollFilterEquals";
import { PollFilterIncludes } from "./PollFilterIncludes";
import { PollFilterLikes } from "./PollFilterLikes";

export type PollFilter = Filter<
  PollFilterEquals,
  PollFilterIncludes,
  PollFilterLikes
>;

export const typeDefs = gql`
  input PollFilter {
    equals: PollFilterEquals
    includes: PollFilterIncludes
    likes: PollFilterLikes
  }
`;
