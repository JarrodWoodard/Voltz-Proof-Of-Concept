import { gql } from "apollo-server-core";

export const typeDefs = gql`
  """
  The \`Date\` scalar type represents \`ISOString\` Date \`YYYY-MM-dd\`
  """
  scalar Date
`;
