import { axios } from '@/api/rest/axios';

import { LoanPayment } from './types';

const ENDPOINT = 'loans/:loanId/payments';

export async function addLoanPayment(loanId: number, paymentDate: Date) {
  const [date] = paymentDate.toISOString().split('T');

  const { data } = await axios.post<LoanPayment>(ENDPOINT.replace(':loanId', String(loanId)), {
    payment_date: date,
  });

  return data;
}
