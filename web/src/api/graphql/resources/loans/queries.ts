import { gql } from '../../../../__generated__';

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
