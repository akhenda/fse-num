import { useSuspenseQuery } from '@apollo/client';

import { GET_LOAN_PAYMENTS } from './queries';

export function useGetLoanPayments() {
  const query = useSuspenseQuery(GET_LOAN_PAYMENTS);

  // we have an opportunity to transform the data here

  return query;
}
