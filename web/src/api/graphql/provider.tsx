/**
 * This gives us an opportunity to scaffold the Apollo client in
 * isolation from the rest of the app
 */

import { PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';

import { client } from './apollo';

export function GraphQLAPIProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
