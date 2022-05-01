import { gql } from "apollo-server-core";

export interface VotedOptionInput {
  voterAddress: string;
}

export const typeDefs = gql`
  input VotedOptionInput {
    voterAddress: String!
  }
`;
