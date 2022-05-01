import { gql } from "apollo-server-core";
import { OptionPropsPrimary } from "../../models/Option";

export type OptionID = OptionPropsPrimary;

export const typeDefs = gql`
  input OptionID {
    optionId: String!
  }
`;
