import { gql } from "apollo-server-core";
import { WithPagination } from "../../functions/withPagination";
import { VoteFields } from "./Vote";

export type VoteWithPaginationFields = WithPagination<VoteFields>;

export const typeDefs = gql`
  type VoteWithPagination {
    totalCount: Int!
    items: [Vote!]!
  }
`;
