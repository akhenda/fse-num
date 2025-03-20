export function AddNewPayment() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p>
          <label>Payment Loan Id</label>
          <input name="loan-id" onChange={() => {}} />
        </p>

        <p>
          <label>Payment Amount</label>
          <input name="payment-amount" type="number" onChange={() => {}} />
        </p>
        <p>
          <button type="submit">Add Payment</button>
        </p>
      </form>
    </div>
  );
}
