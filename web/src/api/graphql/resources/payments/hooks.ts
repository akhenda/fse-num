import { useSuspenseQuery } from '@apollo/client';

import { logger } from '@/lib/logger';

import { GET_LOAN_PAYMENTS } from './queries';

export function useGetLoanPayments() {
  logger.debug('Fetching loan payments');

  const query = useSuspenseQuery(GET_LOAN_PAYMENTS);

  // we have an opportunity to transform the data here

  return query;
}
