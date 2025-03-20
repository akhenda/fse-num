import { Suspense } from 'react';

import { LoadingState } from './loading-state';
import { Loans } from './loans';
import { Payments } from './payments';

export function LoansAndPayments() {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <Loans />
      </Suspense>
      <Suspense fallback={<LoadingState isCompact />}>
        <Payments />
      </Suspense>
    </>
  );
}
