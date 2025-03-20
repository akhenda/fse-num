import { useSuspenseQuery } from '@apollo/client';

import { GET_LOANS } from './queries';

export function useGetLoans() {
  const query = useSuspenseQuery(GET_LOANS);

  // we have an opportunity to transform the data here

  return query;
}
