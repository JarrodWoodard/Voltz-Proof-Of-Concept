import { gql } from "apollo-server-core";
import { WithPagination } from "../../functions/withPagination";
import { UserFields } from "./User";

export type UserWithPaginationFields = WithPagination<UserFields>;

export const typeDefs = gql`
  type UserWithPagination {
    totalCount: Int!
    items: [User!]!
  }
`;
