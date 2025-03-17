import { useTransactions } from "../context/TransactionsContext";

export const TransactionTable = () => {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-2xl mx-auto mt-6">
      <h3 className="text-xl text-center font-semibold mb-4">Histórico de Transações</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Categoria</th>
            <th className="p-2 text-left">Valor</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
              <td className={`p-2 ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                {t.type === "income" ? "Receita" : "Despesa"}
              </td>
              <td className="p-2">{t.category}</td>
              <td className="p-2 font-semibold">R$ {t.amount.toFixed(2)}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
