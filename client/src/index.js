import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList.js';
import AddBook from './components/AddBook.js';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });


const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
    <AddBook />
  </ApolloProvider>
);
 
ReactDOM.render(ApolloApp(BookList), document.getElementById('root'));

