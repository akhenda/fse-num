import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useGetLoanPayments, useGetLoans } from '@/api/graphql/resources';

import { useCategorizedLoanPayments } from './use-categorized-loan-payments';

vi.mock('@/api/graphql/resources', () => ({ useGetLoanPayments: vi.fn(), useGetLoans: vi.fn() }));

const useGetLoansMock = useGetLoans as Mock;
const useGetLoanPaymentsMock = useGetLoanPayments as Mock;

describe('useCategorizedLoanPayments', () => {
  beforeEach(() => {
    // Reset all mocks before each test so there is no test cross-contamination
    vi.resetAllMocks();
  });

  it('should return an empty array for data if there are no loans or loanPayments', () => {
    useGetLoansMock.mockReturnValue({ data: { loans: [] }, error: undefined });
    useGetLoanPaymentsMock.mockReturnValue({ data: { loanPayments: [] }, error: undefined });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeUndefined();
  });

  it('should return an Unpaid status if a loan has no payments', () => {
    useGetLoansMock.mockReturnValue({
      data: { loans: [{ dueDate: '2025-03-01', id: 1 }] },
      error: undefined,
    });

    useGetLoanPaymentsMock.mockReturnValue({ data: { loanPayments: [] }, error: undefined });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].status).toBe('Unpaid');
    expect(result.current.data[0].statusColor).toBe('bg-gray-500');
    expect(result.current.error).toBeUndefined();
  });

  it('should categorize a payment as On Time if it is close to due date', () => {
    useGetLoansMock.mockReturnValue({
      data: { loans: [{ dueDate: '2025-03-01', id: 1 }] },
      error: undefined,
    });

    useGetLoanPaymentsMock.mockReturnValue({
      data: { loanPayments: [{ loanId: 1, paymentDate: '2025-03-01' }] },
      error: undefined,
    });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].status).toBe('On Time');
    expect(result.current.data[0].statusColor).toBe('bg-green-500');
    expect(result.current.error).toBeUndefined();
  });

  it('should categorize a payment as Late if paymentDate is more than 5 days after dueDate but less than 30 days from now', () => {
    // This test simulates a scenario where the payment is slightly later than due date
    // but not older than 30 days from "today".
    useGetLoansMock.mockReturnValue({
      data: { loans: [{ dueDate: '2025-03-01', id: 1 }] },
      error: undefined,
    });

    // Payment is 10ms after the due date (just to illustrate that it’s more than 5ms).
    useGetLoanPaymentsMock.mockReturnValue({
      data: { loanPayments: [{ loanId: 1, paymentDate: '2025-03-07' }] },
      error: undefined,
    });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].status).toBe('Late');
    expect(result.current.data[0].statusColor).toBe('bg-orange-500');
    expect(result.current.error).toBeUndefined();
  });

  it('should categorize a payment as Defaulted if it is older than 30 days from the due date', () => {
    // We can simulate that the paymentDate is well in the past, beyond 30 days
    useGetLoansMock.mockReturnValue({
      data: { loans: [{ dueDate: '2024-01-01', id: 1 }] },
      error: undefined,
    });

    useGetLoanPaymentsMock.mockReturnValue({
      data: {
        loanPayments: [
          {
            loanId: 1,
            // A date that ensures the difference from "today" is more than 30 days
            paymentDate: '2024-02-02',
          },
        ],
      },
      error: undefined,
    });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].status).toBe('Defaulted');
    expect(result.current.data[0].statusColor).toBe('bg-red-500');
    expect(result.current.error).toBeUndefined();
  });

  it('should return combined errors if either loans or payments error out', () => {
    useGetLoansMock.mockReturnValue({ data: undefined, error: new Error('Loans Error') });
    useGetLoanPaymentsMock.mockReturnValue({ data: undefined, error: undefined });

    const { result } = renderHook(() => useCategorizedLoanPayments());

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Loans Error');
  });
});
