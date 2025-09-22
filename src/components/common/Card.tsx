import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : {}}
      className={`
        bg-white rounded-xl shadow-md border border-gray-100
        transition-all duration-200
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};