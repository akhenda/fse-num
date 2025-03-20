import { useGetLoanPayments } from '@/api/graphql/resources';

import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';

export function Payments() {
  const { data, error } = useGetLoanPayments();

  if (error) return <ErrorState error={error} />;
  if (!data || !data.loanPayments) return <EmptyState resource="loans" />;

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
