import { gql } from "apollo-server-core";

export interface OptionFilterIncludes {
  optionId?: string[];
  pollId?: string[];
  description?: string[];
}

export const typeDefs = gql`
  input OptionFilterIncludes {
    optionId: [String!]
    pollId: [String!]
    description: [String!]
  }
`;
