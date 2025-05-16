// src/components/TransactionList.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = ({ transactions, deleteTransaction }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        className="list-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3>Transaction History</h3>
        <p>No transactions yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="list-container transaction-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h3>Transaction History</h3>
      <ul>
        <AnimatePresence>
          {/* REMOVED .sort() here. Transactions are already sorted by createdAt from Firebase */}
          {transactions.map((transaction) => (
            <motion.li
              key={transaction.id}
              className={transaction.type === 'income' ? 'income' : 'expense'}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: {duration: 0.3} }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              layout
            >
              <div className="transaction-info">
                {transaction.description}
                <small>
                  {/*
                    The transaction.date (user-entered) is still displayed,
                    but the list order is determined by createdAt from Firebase.
                  */}
                  {new Date(transaction.date).toLocaleDateString()}
                  {transaction.type === 'expense' && ` - ${transaction.category}`}
                </small>
              </div>
              <span>
                {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
              </span>
              <motion.button
                onClick={() => deleteTransaction(transaction.id)}
                className="btn-delete"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                X
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default TransactionList;