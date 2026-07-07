import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, required, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;
    const describedBy = errorId || helperId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
          >
            {label}
            {required && (
              <span className="text-error-500 ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400 dark:text-secondary-500 transition-colors group-focus-within:text-primary-500"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 rounded-xl border transition-all duration-200',
              'bg-white dark:bg-secondary-800/80',
              'border-secondary-200/80 dark:border-secondary-700/60',
              'text-secondary-900 dark:text-secondary-100',
              'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
              'shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 focus:bg-white dark:focus:bg-secondary-800',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:border-secondary-300 dark:hover:border-secondary-600',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'border-error-400 focus:ring-error-500/20 focus:border-error-400',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            required={required}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-400 dark:text-secondary-500"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id={errorId}
            className="mt-2 text-sm text-error-600 dark:text-error-400"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="mt-2 text-sm text-secondary-500 dark:text-secondary-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
