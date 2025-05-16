// src/components/IncomeExpensePieChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const IncomeExpensePieChart = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const chartData = {
    labels: ['Total Income', 'Total Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [totalIncome, totalExpenses],
        backgroundColor: [
          'rgba(46, 204, 113, 0.7)', // Income color
          'rgba(231, 76, 60, 0.7)',  // Expense color
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
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
        text: 'Income vs. Expenses Overview',
        color: '#f1c40f',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed !== null) {
                    // Changed to INR
                    label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed);
                }
                return label;
            }
        }
      }
    },
  };

  return (
     <motion.div
      className="chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default IncomeExpensePieChart;