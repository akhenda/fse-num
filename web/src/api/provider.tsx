/**
 * The API Provider.
 *
 * Combines both the GraphQL & REST Providers
 */

import { PropsWithChildren } from 'react';

import { GraphQLAPIProvider } from './graphql/provider';
import { RestAPIProvider } from './rest';

export function APIsProvider({ children }: PropsWithChildren) {
  return (
    <GraphQLAPIProvider>
      <RestAPIProvider>{children}</RestAPIProvider>
    </GraphQLAPIProvider>
  );
}
