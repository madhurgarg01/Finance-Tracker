// src/components/Summary.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Summary = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const balance = (income - expenses).toFixed(2);

  const numberVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="summary-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h4>Your Balance</h4>
      <motion.h2 className="money balance" key={`balance-${balance}`} variants={numberVariants} initial="initial" animate="animate">
        ₹{balance} {/* Changed $ to ₹ */}
      </motion.h2>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <motion.p className="money plus" key={`income-${income}`} variants={numberVariants} initial="initial" animate="animate">
            +₹{income} {/* Changed +$ to +₹ */}
          </motion.p>
        </div>
        <div>
          <h4>Expense</h4>
          <motion.p className="money minus" key={`expense-${expenses}`} variants={numberVariants} initial="initial" animate="animate">
            -₹{expenses} {/* Changed -$ to -₹ */}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Summary;