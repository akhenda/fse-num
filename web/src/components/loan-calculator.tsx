import { useEffect, useState } from 'react';

// SECTION 4 Debugging & Code Refactoring

type LoanCalculatorProps = {
  principal: number;
  rate: number;
  months: number;
};

export function LoanCalculator({ principal, rate, months }: LoanCalculatorProps) {
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    setInterest((principal * rate * months) / 100);
  }, [months, principal, rate]);

  return (
    <div>
      <h3>Loan Interest: {interest}</h3>
    </div>
  );
}
