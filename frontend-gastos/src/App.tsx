import { TransactionsProvider } from "./context/TransactionsContext";
import { Dashboard } from "./components/Dashboard";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionTable } from "./components/TransactionTable";

function App() {
  return (
    <TransactionsProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Dashboard Financeiro</h1>
          <TransactionForm />
          <Dashboard />
          <TransactionTable />
        </div>
      </div>
    </TransactionsProvider>
  );
}

export default App;
