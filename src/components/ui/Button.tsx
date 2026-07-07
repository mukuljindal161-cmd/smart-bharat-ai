import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'aria-label'?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-secondary-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30 focus-visible:ring-primary-500/50 dark:bg-primary-500 dark:hover:bg-primary-600 dark:shadow-primary-500/20',
      secondary:
        'bg-secondary-100 text-secondary-900 hover:bg-secondary-200/80 shadow-sm hover:shadow focus-visible:ring-secondary-500/50 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700 dark:shadow-none',
      outline:
        'border-2 border-secondary-200/80 text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300 focus-visible:ring-secondary-500/50 dark:border-secondary-600 dark:text-secondary-200 dark:hover:bg-secondary-800/50 dark:hover:border-secondary-500',
      ghost:
        'text-secondary-600 hover:bg-secondary-100/80 focus-visible:ring-secondary-500/50 dark:text-secondary-300 dark:hover:bg-secondary-800/60',
      danger:
        'bg-error-600 text-white hover:bg-error-700 shadow-md shadow-error-500/20 hover:shadow-lg focus-visible:ring-error-500/50 dark:bg-error-500 dark:hover:bg-error-600',
      gradient:
        'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 focus-visible:ring-primary-500/50',
    };

    const sizes = {
      sm: 'px-3.5 py-2 text-sm',
      md: 'px-4.5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="sr-only">Loading...</span>
        ) : null}
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
