import { Loans } from './Loans';
import { Payments } from './Payments';

export function LoansAndPayments() {
  return (
    <div>
      <h1>Existing Loans & Payments</h1>
      <Loans />
      <Payments />
    </div>
  );
}
