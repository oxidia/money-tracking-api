const { GraphQLScalarType } = require("graphql");

export const ScalarDate = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",

    serialize(value: Date): number {
      return value.getTime();
    },

    parseValue(value?: string | number): Date {
      if (!value) {
        return new Date();
      } else {
        return new Date(value);
      }
    },

    parseLiteral(ast: any): Date {
      return new Date(ast.value);
    }
  })
};
