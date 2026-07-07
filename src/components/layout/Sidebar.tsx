import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  Search,
  FileCheck,
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: Bot,
    label: 'AI Assistant',
    path: '/assistant',
  },
  {
    icon: Search,
    label: 'Scheme Finder',
    path: '/schemes',
    comingSoon: true,
  },
  {
    icon: FileCheck,
    label: 'Document Checker',
    path: '/documents',
    comingSoon: true,
  },
  {
    icon: AlertTriangle,
    label: 'Report Issue',
    path: '/report',
    comingSoon: true,
  },
  {
    icon: FileText,
    label: 'Complaint Tracker',
    path: '/complaints',
    comingSoon: true,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 z-20 bg-secondary-900/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
          width: isOpen ? 280 : 80,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed left-0 top-0 z-30 h-screen',
          'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl',
          'border-r border-secondary-200/60 dark:border-secondary-800/60',
          'flex flex-col shadow-soft',
          'md:relative md:translate-x-0',
          isOpen ? 'md:w-64' : 'md:w-20'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-secondary-200/60 dark:border-secondary-800/60">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30"
            >
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </motion.div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <span className="font-bold text-lg bg-gradient-to-r from-secondary-900 to-secondary-700 dark:from-white dark:to-secondary-300 bg-clip-text text-transparent">
                  Smart Bharat
                </span>
                <p className="text-[10px] text-secondary-500 dark:text-secondary-400 -mt-0.5">
                  AI-Powered Platform
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Toggle button - desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-300 transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isOpen}
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1.5" role="menubar">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  role="none"
                >
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768 && isOpen) {
                        onToggle();
                      }
                    }}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    aria-disabled={item.comingSoon ? 'true' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                      'relative group',
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-secondary-500 hover:bg-secondary-100/80 dark:text-secondary-400 dark:hover:bg-secondary-800/60'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-primary-500 to-accent-500"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={cn(
                        'h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-secondary-100 dark:bg-secondary-800 group-hover:bg-secondary-200/80 dark:group-hover:bg-secondary-700'
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {!isOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute left-full ml-3 px-3 py-1.5 bg-secondary-900 dark:bg-secondary-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap shadow-lg"
                        role="tooltip"
                      >
                        {item.label}
                        {item.comingSoon && (
                          <span className="ml-2 text-warning-400">(Soon)</span>
                        )}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-secondary-900 dark:border-r-secondary-700" aria-hidden="true" />
                      </motion.div>
                    )}
                    {item.comingSoon && isOpen && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-warning-100/80 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400 font-medium" aria-label="Coming soon">
                        Soon
                      </span>
                    )}
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-secondary-200/60 dark:border-secondary-800/60">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl',
              'bg-gradient-to-r from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-accent-900/20',
              'border border-primary-100/50 dark:border-primary-800/30'
            )}
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20" aria-hidden="true">
              <Bot className="h-4 w-4 text-white" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-w-0"
              >
                <p className="text-xs font-semibold text-secondary-900 dark:text-white truncate">
                  AI-Powered
                </p>
                <p className="text-[10px] text-secondary-500 dark:text-secondary-400">
                  Civic Platform
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};
