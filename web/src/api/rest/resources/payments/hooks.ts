import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { logger } from '@/lib/logger';

import { addLoanPayment } from './endpoints';

export function useAddLoanPayment() {
  const ongoingMutationCount = useRef(0);

  return useMutation({
    mutationFn: ({ loanId, paymentDate }: { loanId: number; paymentDate: Date }) =>
      addLoanPayment(loanId, paymentDate),
    onError: () => {
      /**
       * Handle errors
       */
    },
    onMutate: async () => {
      /**
       * If we were also fetching our loan payments list using REST, we would have used
       * this hook to update the list by directly setting the data using it's query key
       * via queryClient.setQueryData
       */
    },
    onSuccess: () => {
      logger.success('Payment added successfully');
    },
    onSettled: () => {
      ongoingMutationCount.current -= 1;

      if (ongoingMutationCount.current === 0) {
        /**
         * If we have finished all mutations, we can invalidate the query key
         *
         * `queryClient.invalidateQueries({ queryKey });`
         */
      }
    },
  });
}
