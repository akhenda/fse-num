import { AddNewPayment } from './components/add-new-payment';
import { LoansAndPayments } from './components/LoansAndPayments';
import { Button } from './components/ui/button';

import './App.css';

function App() {
  return (
    <>
      <div>
        <LoansAndPayments />

        <h1>Add New Payment</h1>
        <AddNewPayment />

        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
      </div>
    </>
  );
}

export default App;
