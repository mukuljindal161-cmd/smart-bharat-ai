import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot,
  Search,
  FileCheck,
  AlertTriangle,
  FileText,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Zap,
  Shield,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const features = [
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Get instant answers about government services, schemes, and procedures.',
    path: '/assistant',
    gradient: 'from-primary-500 to-primary-600',
    iconBg: 'bg-gradient-to-br from-primary-400 to-primary-600',
    available: true,
  },
  {
    icon: Search,
    title: 'Scheme Finder',
    description: 'Discover government schemes you\'re eligible for based on your profile.',
    path: '/schemes',
    gradient: 'from-accent-500 to-accent-600',
    iconBg: 'bg-gradient-to-br from-accent-400 to-accent-600',
    available: false,
  },
  {
    icon: FileCheck,
    title: 'Document Checker',
    description: 'Verify if your documents are complete for various government applications.',
    path: '/documents',
    gradient: 'from-warning-400 to-warning-500',
    iconBg: 'bg-gradient-to-br from-warning-400 to-warning-600',
    available: false,
  },
  {
    icon: AlertTriangle,
    title: 'Report Issue',
    description: 'Report local infrastructure issues directly to concerned authorities.',
    path: '/report',
    gradient: 'from-error-400 to-error-500',
    iconBg: 'bg-gradient-to-br from-error-400 to-error-600',
    available: false,
  },
  {
    icon: FileText,
    title: 'Complaint Tracker',
    description: 'Track the status of your complaints and applications in real-time.',
    path: '/complaints',
    gradient: 'from-secondary-400 to-secondary-500',
    iconBg: 'bg-gradient-to-br from-secondary-400 to-secondary-600',
    available: false,
  },
];

const stats = [
  { label: 'Services Available', value: '500+', icon: TrendingUp, change: '+12%' },
  { label: 'Active Users', value: '2M+', icon: Users, change: '+28%' },
  { label: 'Avg. Response', value: '< 3s', icon: Clock, change: 'Fast' },
];

const highlights = [
  { icon: Zap, text: 'Instant AI Responses' },
  { icon: Shield, text: 'Secure & Private' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <motion.div variants={item} className="mb-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <Badge variant="primary" className="bg-primary-100/80 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                AI Powered Platform
              </span>
            </Badge>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-900 dark:text-white mb-2">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {user?.name?.split(' ')[0] || 'User'}
            </span>
          </h1>
          <p className="text-lg text-secondary-500 dark:text-secondary-400">
            Your intelligent gateway to digital governance services across India
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + idx * 0.05, duration: 0.4 }}
            >
              <Card variant="glass" padding="md" className="relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="success"
                    size="sm"
                    className="bg-success-100/80 dark:bg-success-900/30 text-success-700 dark:text-success-400"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* AI Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10"
      >
        <Card
          variant="gradient"
          padding="none"
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Bot className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      AI Powered
                    </Badge>
                    <Badge variant="success" className="bg-white/90 text-primary-700 border-0">
                      Online
                    </Badge>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Have a question about government services?
                </h2>
                <p className="text-white/80 text-lg mb-6 max-w-xl">
                  Ask our AI assistant anything about schemes, documents, procedures, and more. Get instant, accurate answers 24/7.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/assistant')}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-primary-700 hover:bg-white/90 shadow-lg shadow-black/10"
                >
                  Start Chatting
                </Button>
              </div>
              <div className="hidden md:flex flex-col gap-3">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
          <div className="absolute -right-10 bottom-0 w-40 h-40 rounded-full bg-gradient-to-t from-accent-400/20 to-transparent blur-2xl" />
        </Card>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-10"
      >
        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
              Services
            </h2>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
              Explore our range of civic services
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <motion.div
              key={feature.path}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={feature.available ? feature.path : '#'}
                onClick={(e) => !feature.available && e.preventDefault()}
                className="block h-full"
              >
                <Card
                  variant="glass"
                  padding="lg"
                  hoverable
                  glow={feature.available}
                  className={`h-full ${
                    !feature.available ? 'opacity-60 cursor-not-allowed hover:translate-y-0' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`h-14 w-14 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        feature.available ? 'group-hover:scale-110' : ''
                      }`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    {!feature.available && (
                      <Badge
                        variant="warning"
                        size="sm"
                        className="bg-warning-100/80 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400 border border-warning-200/50 dark:border-warning-700/50"
                      >
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-secondary-500 dark:text-secondary-400 leading-relaxed mb-5">
                    {feature.description}
                  </p>

                  {feature.available && (
                    <div className="flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 group/link">
                      <span className="transition-transform group-hover/link:translate-x-0.5">
                        Open Service
                      </span>
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <Card variant="glass" padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="h-20 w-20 rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 flex items-center justify-center mb-5"
            >
              <Clock className="h-10 w-10 text-secondary-400 dark:text-secondary-500" />
            </motion.div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              No recent activity
            </h3>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 max-w-md">
              Start using Smart Bharat AI to access government services. Your recent interactions will appear here.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
