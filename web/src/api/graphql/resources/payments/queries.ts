import { gql } from '@generated/gql';

export const GET_LOAN_PAYMENTS = gql(`
  query GetLoanPayments {
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
`);
