import { gql } from "apollo-server-core";
import { WithPagination } from "../../functions/withPagination";
import { PollFields } from "./Poll";

export type PollWithPaginationFields = WithPagination<PollFields>;

export const typeDefs = gql`
  type PollWithPagination {
    totalCount: Int!
    items: [Poll!]!
  }
`;
