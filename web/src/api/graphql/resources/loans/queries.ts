import { gql } from '@generated/gql';

export const GET_LOANS = gql(`
  query GetLoans {
    loans {
      id
      name
      principal
      interestRate
      dueDate
    }
  }
`);
