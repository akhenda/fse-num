/**
 * Since we also need a REST API Client, we will bootstrap it here
 */

import { PropsWithChildren } from 'react';

export function RestAPIProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
