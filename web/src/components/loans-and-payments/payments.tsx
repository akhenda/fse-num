import { useGetLoanPayments } from '@/api/graphql/resources';

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';

export function Payments() {
  const { data, error } = useGetLoanPayments();

  if (error) return <ErrorState error={error} />;
  if (!data || !data.loanPayments) return <EmptyState resource="payments" />;

  return (
    <div>
      <h2>Payments</h2>
      <ul>
        {data.loanPayments.map((payment, index) => {
          return (
            <li key={`${index}-${payment?.id}`}>
              <p>{payment?.id}</p>
              <p>{payment?.loanId}</p>
              <p>{payment?.paymentDate}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
