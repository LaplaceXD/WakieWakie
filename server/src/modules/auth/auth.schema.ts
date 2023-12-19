import gql from "graphql-tag";

export const typeDefs = gql`
  type Book {
    title: String
    """
    Testing
    """
    author: String
  }

  type Query {
    """
    Testing Description
    """
    books: [Book]
  }
`;
