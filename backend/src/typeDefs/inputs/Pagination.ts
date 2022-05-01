import { gql } from "apollo-server-core";

export interface Pagination {
  limit: number;
  offset: number;
}

export const typeDefs = gql`
  input Pagination {
    limit: Int
    offset: Int = 0
  }
`;
