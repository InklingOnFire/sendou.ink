import { gql, makeExecutableSchema } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }
  type Query {
    viewer: User
  }
`;

export const resolvers = {
  Query: {
    viewer() {
      return { id: 1, name: "John Smith", status: "cached" };
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
