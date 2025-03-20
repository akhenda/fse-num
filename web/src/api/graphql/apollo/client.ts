/**
 * We use this dedicated file to define the apollo client so that we can have all
 * client related logic living together in this file.
 *
 * In here we can add middlewares such as auth middleware and even define headers to the client
 *
 * tldr; this allows us to separate the apollo cleint from the rest of the application
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:2024/graphql',
});
