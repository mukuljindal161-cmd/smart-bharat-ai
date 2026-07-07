import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on escape
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showDropdown) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-20 h-16',
        'bg-white/70 dark:bg-secondary-900/70',
        'backdrop-blur-xl',
        'border-b border-secondary-200/60 dark:border-secondary-800/60'
      )}
      role="banner"
    >
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="h-10 w-10 flex items-center justify-center rounded-xl text-secondary-500 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </motion.button>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20" aria-hidden="true">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                  Welcome back,{' '}
                  <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                    {user?.name?.split(' ')[0]}
                  </span>
                </p>
                <p className="text-[10px] text-secondary-500 dark:text-secondary-400 -mt-0.5">
                  Digital Governance Platform
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={cn(
              'h-10 w-10 flex items-center justify-center rounded-xl',
              'text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100/80',
              'dark:text-secondary-400 dark:hover:text-secondary-200 dark:hover:bg-secondary-800/60',
              'transition-all duration-200'
            )}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5" aria-hidden="true" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative h-10 w-10 flex items-center justify-center rounded-xl',
              'text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100/80',
              'dark:text-secondary-400 dark:hover:text-secondary-200 dark:hover:bg-secondary-800/60',
              'transition-all duration-200'
            )}
            aria-label="Notifications (3 unread)"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error-500"></span>
            </span>
          </motion.button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-secondary-200/80 dark:bg-secondary-700/60 mx-1" aria-hidden="true" />

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-secondary-100/80 dark:hover:bg-secondary-800/60 transition-colors"
              aria-expanded={showDropdown}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <Avatar name={user?.name} size="sm" />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate max-w-[120px]">
                  {user?.email}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-secondary-400 transition-transform duration-200 hidden lg:block',
                  showDropdown && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowDropdown(false)}
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={cn(
                      'absolute right-0 mt-2 w-64 rounded-2xl shadow-soft-lg z-40',
                      'bg-white/95 dark:bg-secondary-800/95 backdrop-blur-xl',
                      'border border-secondary-200/60 dark:border-secondary-700/60',
                      'py-2 overflow-hidden'
                    )}
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-900/20 dark:to-accent-900/20">
                      <div className="flex items-center gap-3">
                        <Avatar name={user?.name} size="md" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-secondary-900 dark:text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5" role="none">
                      {[
                        { icon: User, label: 'Profile', onClick: () => setShowDropdown(false) },
                        { icon: Settings, label: 'Settings', onClick: () => setShowDropdown(false) },
                        { icon: HelpCircle, label: 'Help & Support', onClick: () => setShowDropdown(false) },
                      ].map((item, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ x: 4 }}
                          onClick={item.onClick}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
                          role="menuitem"
                        >
                          <item.icon className="h-4 w-4 text-secondary-400" aria-hidden="true" />
                          {item.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="pt-1.5 border-t border-secondary-200/60 dark:border-secondary-700/60" role="none">
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Log out
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
