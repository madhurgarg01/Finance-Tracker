// src/components/TransactionForm.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const EXPENSE_CATEGORIES = ['Food', 'Stationary', 'Outing', 'Miscellaneous', 'Bills', 'Transport'];

const TransactionForm = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); // 'income' or 'expense'
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Today's date

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      type,
      category: type === 'expense' ? category : 'Income', // Assign category only for expenses
      date,
    };

    addTransaction(newTransaction);

    // Reset form
    setDescription('');
    setAmount('');
    // setType('income'); // Or keep last type
    // setCategory(EXPENSE_CATEGORIES[0]);
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>        
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            min="0.01"
            step="0.01"
            required
          />
        </div>
        {type === 'expense' && (
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {EXPENSE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
         <div className="form-control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <motion.button
          className="btn"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TransactionForm;