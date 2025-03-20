import { axios } from '@/api/rest/axios';
import { logger } from '@/lib/logger';
import { getAddPaymentDateFormat } from '@/lib/payments';

import { LoanPayment } from './types';

const ENDPOINT = 'loans/:loanId/payments';

export async function addLoanPayment(loanId: number, paymentDate: Date) {
  const date = getAddPaymentDateFormat(paymentDate);

  logger.info(`Adding payment for loan ${loanId} on ${date}`);

  const { data } = await axios.post<LoanPayment>(ENDPOINT.replace(':loanId', String(loanId)), {
    payment_date: date,
  });

  return data;
}
