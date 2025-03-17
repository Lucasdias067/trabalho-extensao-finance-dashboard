import { useTransactions } from "../context/TransactionsContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,  
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { transactions } = useTransactions();
  
  const categories = [...new Set(transactions.map(t => t.category))];
  
  const categoryTotals = categories.map(category => {
    const categoryTransactions = transactions.filter(t => t.category === category);
    const total = categoryTransactions.reduce((sum, t) => {
      return t.type === "income" ? sum + t.amount : sum - t.amount;
    }, 0);
    return { category, total };
  });
  
  const barData = {
    labels: categoryTotals.map(item => item.category),
    datasets: [
      {
        label: "Total por Categoria",
        data: categoryTotals.map(item => Math.abs(item.total)),
        backgroundColor: categoryTotals.map(item => item.total >= 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"),
        borderColor: categoryTotals.map(item => item.total >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"),
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: categoryTotals.map(item => item.category),
    datasets: [
      {
        data: categoryTotals.map(item => Math.abs(item.total)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumo por Categoria',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Distribuição por Categoria',
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-[60%] max-w-4xl mx-auto mt-6">
      <h3 className="text-xl text-center font-semibold mb-4">Resumo Financeiro</h3>
      
      <div className=" mx-auto">
        <div>
          <Bar data={barData} options={barOptions} />
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};