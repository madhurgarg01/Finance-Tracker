// src/components/GoalTracker.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GoalTracker = ({ balance }) => {
  const [goal, setGoal] = useState(50000); // Example goal in INR
  const [goalName, setGoalName] = useState("Emergency Fund");

  const progress = balance > 0 ? Math.min((balance / goal) * 100, 100) : 0;

  return (
    <motion.div
      className="goal-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3>Goal: {goalName}</h3>
      <p>Target: ₹{goal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> {/* Changed $ to ₹ and formatted */}
      <p>Current Progress: ₹{Number(balance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> {/* Changed $ to ₹ and formatted */}
      <div style={{
          width: '100%',
          backgroundColor: '#555',
          borderRadius: '5px',
          overflow: 'hidden',
          marginTop: '10px'
        }}>
        <motion.div
          style={{
            width: `${progress}%`,
            height: '20px',
            backgroundColor: 'var(--income-color)',
            borderRadius: '5px 0 0 5px',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      <p style={{textAlign: 'right', marginTop: '5px'}}>{progress.toFixed(1)}% Complete</p>
      {/* Add inputs here to set goalName and goal amount later */}
    </motion.div>
  );
};

export default GoalTracker;