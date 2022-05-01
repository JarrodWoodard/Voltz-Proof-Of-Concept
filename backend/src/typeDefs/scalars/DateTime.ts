import { gql } from "apollo-server-core";

export const typeDefs = gql`
  """
  The \`DateTime\` scalar type represents \`ISOString\` DateTime \`YYYY-MM-ddTHH:mm:ss.SSSZ\`
  """
  scalar DateTime
`;
