import { gql } from '../../../../__generated__';

export const GET_LOAN_PAYMENTS = gql(`
  query GetLoanPayments {
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
`);
