import { useState } from "react";
import { api } from "../services/api";
import { useTransactions } from "../context/TransactionsContext";

export const TransactionForm = () => {
  const { fetchTransactions } = useTransactions();

  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;

    await api.post("/transactions", {
      type,
      category,
      amount: Number(amount),
    });

    setCategory("");
    setAmount("");
    fetchTransactions();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-full max-w-md mx-auto">
      <h3 className="text-xl text-center font-semibold mb-4">Adicionar Transação</h3>
      <select
        className="w-full p-2 border rounded mb-3"
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
      >
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
      </select>
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <button type="submit" className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Adicionar
      </button>
    </form>
  );
};
