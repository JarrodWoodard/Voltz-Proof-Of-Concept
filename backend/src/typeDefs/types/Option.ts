import { gql } from "apollo-server-core";
import { OptionProps } from "../../models/Option";

export type OptionFields = OptionProps;

export const typeDefs = gql`
  type Option {
    # fields
    optionId: String!
    pollId: String!
    description: String!

    # edges
    poll: Poll!
    votes: [Vote!]!
  }
`;
