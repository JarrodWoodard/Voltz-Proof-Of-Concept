import { gql } from "apollo-server-core";

export interface OptionFilterEquals {
  optionId?: string;
  pollId?: string;
  description?: string;
}

export const typeDefs = gql`
  input OptionFilterEquals {
    optionId: String
    pollId: String
    description: String
  }
`;
