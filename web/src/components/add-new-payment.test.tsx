import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useAddLoanPayment } from '@/api';

import { AddNewPayment } from './add-new-payment';

// Mock the useAddLoanPayment hook
vi.mock('@/api', () => ({ useAddLoanPayment: vi.fn() }));

const useAddLoanPaymentMock = useAddLoanPayment as Mock;

describe('AddNewPayment', () => {
  const mutateMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    useAddLoanPaymentMock.mockReturnValue({ isError: false, isPending: false, mutate: mutateMock });
  });

  it('renders heading if not in a dialog', () => {
    render(<AddNewPayment />);

    expect(screen.getByText(/Add New Payment/i)).toBeInTheDocument();
  });

  it('does not render heading if inDialog is true', () => {
    render(<AddNewPayment inDialog />);

    expect(screen.queryByText(/Add New Payment/i)).not.toBeInTheDocument();
  });

  it('renders loanId and date inputs', () => {
    render(<AddNewPayment />);

    // Loan ID input
    expect(screen.getByLabelText(/Loan ID/i)).toBeInTheDocument();

    // Payment Date label
    expect(screen.getByText(/Payment Date/i)).toBeInTheDocument();

    // The button for selecting a date
    expect(screen.getByRole('button', { name: /date-button/i })).toBeInTheDocument();
  });

  it('applies default props if none are provided (date=now, loanId="")', () => {
    render(<AddNewPayment />);

    // The loanId input defaults to ""
    const loanIdInput = screen.getByLabelText(/Loan ID/i) as HTMLInputElement;
    expect(loanIdInput.value).toBe('');

    // The date button should show today's date if no date is provided
    // Instead of `Pick a date`, it should show something like 'Thur Mar 20 2025' depending on test environment
    // We just confirm it is not showing the placeholder text
    expect(screen.queryByRole('button', { name: /date-button/i })).toHaveTextContent(
      new Date().toDateString(),
    );
  });

  it('loads passed in loanId prop into the form', () => {
    render(<AddNewPayment loanId="123" />);

    const loanIdInput = screen.getByLabelText(/Loan ID/i) as HTMLInputElement;
    expect(loanIdInput.value).toBe('123');
  });

  it('calls mutate with correct values on valid submit', async () => {
    render(<AddNewPayment />);

    // Fill in loan ID
    const loanIdInput = screen.getByLabelText(/Loan ID/i) as HTMLInputElement;
    fireEvent.change(loanIdInput, { target: { value: '1234' } });

    // The date button defaults to today's date as a string.
    // For the test, let's just trust the default date or confirm it's present.
    // Now let's submit the form:
    const submitButton = screen.getByRole('button', { name: /Add Payment/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledTimes(1);
    });

    // Checking exact arguments is optional but recommended
    const mutateArgs = mutateMock.mock.calls[0][0];
    expect(mutateArgs.loanId).toBe(1234);
    // The date will be close to the current date; we can check instance type
    expect(mutateArgs.paymentDate).toBeInstanceOf(Date);
  });

  it('shows validation error when loanId is empty', async () => {
    render(<AddNewPayment />);

    // The date is prefilled with default date, so let's just submit
    const submitButton = screen.getByRole('button', { name: /Add Payment/i });
    fireEvent.click(submitButton);

    // The error message for required "LoanID" is shown
    await waitFor(() => {
      expect(screen.getByText(/Loan ID should be a positive integer/i)).toBeInTheDocument();
    });

    // mutate should not have been called
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('shows validation error when loanId is not a positive integer', async () => {
    render(<AddNewPayment />);

    // Enter a negative number
    const loanIdInput = screen.getByLabelText(/Loan ID/i) as HTMLInputElement;
    fireEvent.change(loanIdInput, { target: { value: '-5' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Add Payment/i });
    fireEvent.click(submitButton);

    // The error message for a positive integer is shown
    await waitFor(() => {
      expect(screen.getByText(/Loan ID should be a positive integer/i)).toBeInTheDocument();
    });

    // mutate should not have been called
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('shows loading state while the form is submitting', async () => {
    useAddLoanPaymentMock.mockReturnValue({ isError: false, isPending: true, mutate: mutateMock });

    render(<AddNewPayment />);

    // The button text or state changes when isPending=true
    const submitButton = screen.getByRole('button', { name: /Add Payment/i });

    expect(submitButton).toBeDisabled();
  });
});
