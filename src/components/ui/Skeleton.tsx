import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  ...props
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-secondary-200 dark:bg-secondary-700',
        variants[variant],
        typeof width === 'number' ? `w-${width}` : width,
        typeof height === 'number' ? `h-${height}` : height,
        className
      )}
      style={{
        width: typeof width === 'string' ? width : undefined,
        height: typeof height === 'string' ? height : undefined,
      }}
      {...props}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="p-6 rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700">
    <Skeleton className="h-6 w-24 mb-4" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-4" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
    ))}
  </div>
);

export const AvatarSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  return <Skeleton variant="circular" className={sizes[size]} />;
};
