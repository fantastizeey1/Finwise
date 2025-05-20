import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Format a number as currency with Naira symbol
 */
export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

/**
 * Generate a random color for UI elements
 */
export function getRandomColor(): string {
  const colors = [
    '#3b82f6', // blue
    '#22c55e', // green
    '#ef4444', // red
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get appropriate icon for different expense categories
 */
export function getCategoryIcon(category: string): string {
  const categoryMap: Record<string, string> = {
    Housing: 'home',
    Food: 'utensils',
    Transportation: 'car',
    Utilities: 'zap',
    Shopping: 'shopping-bag',
    Entertainment: 'film',
    Health: 'heart',
    Education: 'book',
    Personal: 'user',
    Others: 'package',
  };

  return categoryMap[category] || 'circle';
}
