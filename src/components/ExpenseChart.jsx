// src/components/ExpenseChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EXPENSE_CATEGORIES = ['Food', 'Stationary', 'Outing', 'Miscellaneous', 'Bills', 'Transport'];


const ExpenseChart = ({ transactions }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const dataByCat = EXPENSE_CATEGORIES.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  expenseTransactions.forEach(t => {
    if (dataByCat.hasOwnProperty(t.category)) {
      dataByCat[t.category] += t.amount;
    }
  });

  const chartData = {
    labels: EXPENSE_CATEGORIES,
    datasets: [
      {
        label: 'Expenses by Category',
        data: EXPENSE_CATEGORIES.map(cat => dataByCat[cat]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#ecf0f1' }
      },
      title: {
        display: true,
        text: 'Expense Breakdown',
        color: '#f1c40f',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    // Changed to INR
                    label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
                }
                return label;
            }
        }
      }
    },
    scales: {
        x: {
            ticks: { color: '#bdc3c7' },
            grid: { color: 'rgba(189, 195, 199, 0.2)'}
        },
        y: {
            ticks: { 
                color: '#bdc3c7', 
                // Changed to INR
                callback: function(value) { return '₹' + value.toLocaleString('en-IN'); }
            },
            grid: { color: 'rgba(189, 195, 199, 0.2)'}
        }
    }
  };

  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default ExpenseChart;