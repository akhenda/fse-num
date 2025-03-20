import { AddNewPayment } from './components/AddNewPayment';
import { LoansAndPayments } from './components/LoansAndPayments';

import './App.css';

function App() {
  return (
    <>
      <div>
        <LoansAndPayments />

        <h1>Add New Payment</h1>
        <AddNewPayment />
      </div>
    </>
  );
}

export default App;
