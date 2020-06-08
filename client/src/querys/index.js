import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`;

export const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($name: String!,$genre: String!,$authorId: String!) {
    addBook(name: $name,genre: $genre,authorId: $authorId) {
      name
      genre
    }
  }
`;





