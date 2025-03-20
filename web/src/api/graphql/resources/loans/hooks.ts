import { useSuspenseQuery } from '@apollo/client';

import { logger } from '@/lib/logger';

import { GET_LOANS } from './queries';

export function useGetLoans() {
  logger.debug('Fetching loans');

  const query = useSuspenseQuery(GET_LOANS);

  // we have an opportunity to transform the data here

  return query;
}
