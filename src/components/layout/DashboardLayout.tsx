import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { PageLoading } from '../ui/Loading';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-secondary-100 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-200/20 dark:bg-accent-900/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-primary-100/40 dark:bg-primary-800/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block"
        aria-hidden="true"
      />

      <div
        className={`transition-all duration-300 ease-out md:absolute md:right-0 md:top-0 md:left-0 ${
          sidebarOpen ? 'md:left-64' : 'md:left-20'
        }`}
      >
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main
          id="main-content"
          className="p-3 sm:p-4 md:p-6 lg:p-8 relative z-10"
          role="main"
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};
