import { gql } from "apollo-server-core";

export interface PollCreateInputOption {
  optionId: string;
  description: string;
}

export const typeDefs = gql`
  input PollCreateInputOption {
    optionId: String!
    description: String!
  }
`;
