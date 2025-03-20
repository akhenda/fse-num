import { Loans } from './loans';
import { Payments } from './payments';

export function LoansAndPayments() {
  return (
    <div>
      <h1>Existing Loans & Payments</h1>
      <Loans />
      <Payments />
    </div>
  );
}
