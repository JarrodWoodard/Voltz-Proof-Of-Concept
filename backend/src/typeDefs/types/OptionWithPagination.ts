import { gql } from "apollo-server-core";
import { WithPagination } from "../../functions/withPagination";
import { OptionFields } from "./Option";

export type OptionWithPaginationFields = WithPagination<OptionFields>;

export const typeDefs = gql`
  type OptionWithPagination {
    totalCount: Int!
    items: [Option!]!
  }
`;
