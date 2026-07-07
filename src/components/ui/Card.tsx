import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        'bg-white dark:bg-secondary-800 shadow-soft',
      elevated:
        'bg-white dark:bg-secondary-800 shadow-soft-lg',
      bordered:
        'bg-white/80 dark:bg-secondary-800/80 border border-secondary-200/60 dark:border-secondary-700/40 shadow-soft backdrop-blur-sm',
      glass:
        'bg-white/60 dark:bg-secondary-800/60 backdrop-blur-xl border border-white/20 dark:border-secondary-700/30 shadow-glass dark:shadow-glass-dark',
      gradient:
        'bg-gradient-to-br from-white to-secondary-50 dark:from-secondary-800 dark:to-secondary-900 border border-secondary-200/40 dark:border-secondary-700/30 shadow-soft',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl',
          'transition-all duration-300 ease-out',
          variants[variant],
          paddings[padding],
          hoverable &&
            'cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 hover:border-primary-200/60 dark:hover:border-primary-700/40',
          glow && 'hover:shadow-glow dark:hover:shadow-glow',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold tracking-tight text-secondary-900 dark:text-secondary-100',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-secondary-500 dark:text-secondary-400 leading-relaxed', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mt-5 flex items-center gap-3', className)} {...props} />
));

CardFooter.displayName = 'CardFooter';
