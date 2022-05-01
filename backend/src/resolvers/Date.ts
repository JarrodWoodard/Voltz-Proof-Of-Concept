import { GraphQLScalarType } from "graphql";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description:
    "The `Date` scalar type represents `ISOString` Date `YYYY-MM-dd`",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }

    return value;
  },
});

export { DateScalar as Date };
