// components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
}

const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  // Base styles for all card variants
  const baseStyles = 'bg-white rounded-xl overflow-hidden';

  // Variant-specific styles
  const variantStyles = {
    default: 'p-4',
    elevated: 'p-4 shadow-md',
    bordered: 'p-4 border border-gray-200',
  };

  return <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</div>;
};

export default Card;
