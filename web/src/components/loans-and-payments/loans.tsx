import { useGetLoans } from '@/api/graphql/resources';

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';

export function Loans() {
  const { data, error } = useGetLoans();

  if (error) return <ErrorState error={error} />;
  if (!data || !data.loans) return <EmptyState resource="loans" />;

  return (
    <div>
      <h2>Loans</h2>
      <ul>
        {data.loans.map((loan, index) => {
          return (
            <li key={`${index}-${loan?.id}`}>
              <p>{loan?.id}</p>
              <p>{loan?.name}</p>
              <p>{loan?.principal}</p>
              <p>{loan?.dueDate}</p>
              <p>{loan?.interestRate}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
