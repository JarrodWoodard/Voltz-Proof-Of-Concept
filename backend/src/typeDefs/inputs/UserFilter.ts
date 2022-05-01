import { gql } from "apollo-server-core";
import { Filter } from "../../@types/Filter";
import { UserFilterEquals } from "./UserFilterEquals";
import { UserFilterIncludes } from "./UserFilterIncludes";
import { UserFilterLikes } from "./UserFilterLikes";

export type UserFilter = Filter<
  UserFilterEquals,
  UserFilterIncludes,
  UserFilterLikes
>;

export const typeDefs = gql`
  input UserFilter {
    equals: UserFilterEquals
    includes: UserFilterIncludes
    likes: UserFilterLikes
  }
`;
