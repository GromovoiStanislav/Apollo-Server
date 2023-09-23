//import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql } = pkg;

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query Books {
        books {
          author
          title
        }
      }
    `,
  })
  .then((result) => console.log(result.data.books));

////////////////////////////////////

const GET_BOOK = gql`
  query Books($idx: Int!) {
    book(idx: $idx) {
      author
      title
    }
  }
`;

client
  .query({
    query: GET_BOOK,
    variables: { idx: 1 },
  })
  .then((result) => {
    console.log(result.data.book);
  });
