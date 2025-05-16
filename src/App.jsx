// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import IncomeExpensePieChart from './components/IncomeExpensePieChart';
import GoalTracker from './components/GoalTracker';
// import { useLocalStorage } from './hooks/useLocalStorage'; // No longer needed
import { motion } from 'framer-motion';
import './App.css';

// Import Firebase and Firestore methods
import { db } from './firebase-config'; // Your Firebase config
import {
  collection,
  getDocs,    // To fetch once
  onSnapshot, // For real-time updates
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy // To order transactions by date
} from 'firebase/firestore';

function App() {
  const [transactions, setTransactions] = useState([]);
  const transactionsCollectionRef = collection(db, "transactions"); // "transactions" will be your collection name in Firestore

  // --- Fetch transactions from Firestore (real-time) ---
  useEffect(() => {
    // Create a query to order transactions by date (descending)
    // Assuming you store 'date' as a string like 'YYYY-MM-DD' or a Timestamp
    // If 'date' is a string, Firestore will sort lexicographically. For true date sorting, use Firestore Timestamps.
    // For simplicity with current setup, we'll assume string date or sort client-side.
    // Let's create a 'createdAt' timestamp field for better server-side sorting.
    const q = query(transactionsCollectionRef, orderBy("createdAt", "desc")); // Order by 'createdAt' timestamp

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTransactions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Get the document ID from Firestore
      }));
      setTransactions(fetchedTransactions);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // --- Add Transaction to Firestore ---
  const addTransaction = async (transaction) => {
    // Add a 'createdAt' timestamp for server-side sorting
    const newTransactionData = {
      ...transaction,
      amount: parseFloat(transaction.amount), // Ensure amount is a number
      createdAt: new Date() // Firestore will convert this to its Timestamp type
    };
    try {
      await addDoc(transactionsCollectionRef, newTransactionData);
      // No need to setTransactions here, onSnapshot will update it automatically
    } catch (error) {
      console.error("Error adding transaction: ", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  // --- Delete Transaction from Firestore ---
  const deleteTransaction = async (id) => {
    try {
      const transactionDoc = doc(db, "transactions", id); // Reference to the specific document
      await deleteDoc(transactionDoc);
      // No need to setTransactions here, onSnapshot will update it automatically
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div className="grid-container">
        <TransactionForm addTransaction={addTransaction} />
        <Summary transactions={transactions} />
      </div>

      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />

      <div className="grid-container">
        <ExpenseChart transactions={transactions} />
        <IncomeExpensePieChart transactions={transactions} />
      </div>

      <GoalTracker balance={balance} />
    </motion.div>
  );
}

export default App;