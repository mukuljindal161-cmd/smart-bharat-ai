import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Clock, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, description, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6"
        >
          <div className="h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-900 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            {title}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20 py-3 px-4 rounded-lg">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Coming Soon</span>
          </div>

          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Go Back
            </Button>
            <Button
              variant="primary"
              leftIcon={<Bell className="h-4 w-4" />}
              onClick={() => {
                // Would trigger a notification subscription in a real app
              }}
            >
              Notify Me
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -z-10 opacity-5"
        >
          <Construction className="h-64 w-64 text-secondary-900 dark:text-secondary-100" />
        </motion.div>
      </motion.div>
    </div>
  );
};
