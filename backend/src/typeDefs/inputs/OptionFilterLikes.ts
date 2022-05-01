import { gql } from "apollo-server-core";

export interface OptionFilterLikes {
  optionId?: string;
  pollId?: string;
  description?: string;
}

export const typeDefs = gql`
  input OptionFilterLikes {
    optionId: String
    pollId: String
    description: String
  }
`;
