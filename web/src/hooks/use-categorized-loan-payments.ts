import { useMemo } from 'react';

import { useGetLoanPayments, useGetLoans } from '@/api/graphql/resources';

export const paymentStatuses = {
  Defaulted: 'Defaulted',
  Late: 'Late',
  OnTime: 'On Time',
  Unpaid: 'Unpaid',
} as const;

export type PaymentStatus = (typeof paymentStatuses)[keyof typeof paymentStatuses];

function getPaymentCategory(dueDateStr: string, paymentDateStr: string) {
  const dueDate = new Date(dueDateStr);
  const paymentDate = paymentDateStr ? new Date(paymentDateStr) : null;

  if (!paymentDate || paymentDate.valueOf() < dueDate.valueOf()) return 'Unpaid';

  const daysPassed = Math.floor(
    (paymentDate.valueOf() - dueDate.valueOf()) / (1000 * 60 * 60 * 24),
  );
  if (daysPassed <= 5) return 'On Time';
  if (daysPassed > 5 && paymentDate <= new Date(dueDate.setDate(dueDate.getDate() + 30)))
    return 'Late';
  return 'Defaulted';
}

function getStatusColor(status: PaymentStatus) {
  const colorMap = {
    Defaulted: 'bg-red-500', // red
    Late: 'bg-orange-500', // orange
    'On Time': 'bg-green-500', // green
    Unpaid: 'bg-gray-500', // gray
  } as const;

  return colorMap[status];
}

export function useCategorizedLoanPayments() {
  const { data: loansData, error: loansError } = useGetLoans();
  const { data: paymentsData, error: paymentsError } = useGetLoanPayments();

  const payments = useMemo(() => {
    if (!paymentsData?.loanPayments || !loansData?.loans) return [];

    return loansData.loans
      .map((loan) => {
        const loanPayments = paymentsData.loanPayments?.filter(
          (payment) => payment?.loanId === loan?.id,
        );

        if (!loanPayments || !loanPayments.length) {
          return [
            { ...loan, paymentDate: null, status: 'Unpaid', statusColor: getStatusColor('Unpaid') },
          ];
        }

        return loanPayments?.map((payment) => {
          const paymentDate = payment?.paymentDate;
          const status = getPaymentCategory(loan?.dueDate, paymentDate);
          const color = getStatusColor(status);

          return { ...loan, paymentDate, status, statusColor: color };
        });
      })
      .flat();
  }, [loansData?.loans, paymentsData]);

  return { data: payments, error: loansError || paymentsError };
}
