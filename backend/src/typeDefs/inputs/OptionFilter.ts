import { gql } from "apollo-server-core";
import { Filter } from "../../@types/Filter";
import { OptionFilterEquals } from "./OptionFilterEquals";
import { OptionFilterIncludes } from "./OptionFilterIncludes";
import { OptionFilterLikes } from "./OptionFilterLikes";

export type OptionFilter = Filter<
  OptionFilterEquals,
  OptionFilterIncludes,
  OptionFilterLikes
>;

export const typeDefs = gql`
  input OptionFilter {
    equals: OptionFilterEquals
    includes: OptionFilterIncludes
    likes: OptionFilterLikes
  }
`;
