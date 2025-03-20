import { Suspense } from 'react';

import { Loans } from './loans';
import { Payments } from './payments';

export function LoansAndPayments() {
  return (
    <div>
      <h1>Existing Loans & Payments</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Loans />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Payments />
      </Suspense>
    </div>
  );
}
