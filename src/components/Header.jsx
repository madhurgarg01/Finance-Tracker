// src/components/Header.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.h1
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, duration: 0.5 }}
    >
      Personal Finance Dashboard
    </motion.h1>
  );
};

export default Header;