import { GraphQLScalarType, Kind, ASTNode, GraphQLError } from "graphql";

export const ScalarDate = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",

    serialize(value: Date): number {
      const timestamp = value.getTime();

      if (isNaN(timestamp)) {
        throw new GraphQLError("GRAPHQL_VALIDATION_FAILED");
      }

      return timestamp;
    },

    parseValue(value: string | number): Date {
      const date = new Date(value);

      if (isNaN(date.getTime())) {
        throw new GraphQLError("GRAPHQL_VALIDATION_FAILED");
      }

      return date;
    },

    parseLiteral(ast: ASTNode): Date {
      var date = null;

      if (ast.kind == Kind.INT) {
        date = new Date(parseInt(ast.value, 10));
      } else if (ast.kind == Kind.STRING) {
        date = new Date(ast.value);
      }

      if (!date || isNaN(date.getTime())) {
        throw new GraphQLError("GRAPHQL_VALIDATION_FAILED");
      }

      return date;
    }
  })
};
