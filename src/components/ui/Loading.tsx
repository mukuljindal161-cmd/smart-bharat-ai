import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
  className,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className={cn('text-primary-500', sizes[size])} />
        </motion.div>
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-secondary-500 dark:text-secondary-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-950 dark:to-secondary-900">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-200/20 dark:bg-accent-900/20 blur-3xl"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/30"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Smart Bharat AI
            </h2>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Loading...
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return content;
};

export const PageLoading: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loading size="lg" text="Loading..." />
  </div>
);
