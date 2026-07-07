import React from 'react';
import { cn } from '../../utils/cn';
import { User } from 'lucide-react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  name,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  if (src) {
    return (
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-secondary-200 dark:bg-secondary-700',
          sizes[size],
          className
        )}
        {...props}
      >
        <img src={src} alt={alt || name || 'Avatar'} className="h-full w-full object-cover" />
      </div>
    );
  }

  if (name) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium dark:bg-primary-900 dark:text-primary-300',
          sizes[size],
          className
        )}
        {...props}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-secondary-200 dark:bg-secondary-700 text-secondary-500',
        sizes[size],
        className
      )}
      {...props}
    >
      <User className={iconSizes[size]} />
    </div>
  );
};
