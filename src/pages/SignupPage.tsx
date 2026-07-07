import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Check, Shield, Zap, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupPage: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');

  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const strengthCount = Object.values(passwordStrength).filter(Boolean).length;

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      await signup(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-600 via-accent-500 to-primary-600 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 h-40 w-40 rounded-full border-2 border-white/20"
          />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Logo and brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Smart Bharat AI</span>
                <p className="text-sm text-white/70">Digital Governance Platform</p>
              </div>
            </motion.div>

            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Join the Digital
              <span className="block mt-2 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Revolution Today
              </span>
            </h1>

            <p className="text-lg text-white/80 mb-12 max-w-lg leading-relaxed">
              Create your account to access a world of government services at your fingertips. Join millions of citizens embracing digital governance.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: Check, text: 'Quick & Easy Registration' },
                { icon: Shield, text: 'Secure & Private Data Handling' },
                { icon: Zap, text: 'Personalized Recommendations' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base text-white/90 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 flex items-center gap-8"
          >
            {[
              { value: '2M+', label: 'Users Joined' },
              { value: '4.9', label: 'App Rating' },
              { value: '100%', label: 'Free' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Signup form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-28 bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-950 dark:to-secondary-900 relative"
      >
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="absolute top-6 right-6 h-11 w-11 flex items-center justify-center rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors shadow-soft"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.button>

        {/* Mobile logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:hidden flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg shadow-accent-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 dark:from-white dark:to-secondary-300 bg-clip-text text-transparent">
            Smart Bharat AI
          </span>
        </motion.div>

        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center lg:text-left mb-8"
          >
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              Create account
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400">
              Get started with Smart Bharat AI
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800"
            >
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              leftIcon={<User className="h-5 w-5" />}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                {...register('password')}
              />

              {/* Password strength indicators */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-3"
                >
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          strengthCount >= level
                            ? strengthCount <= 1
                              ? 'bg-error-500'
                              : strengthCount <= 2
                              ? 'bg-warning-500'
                              : strengthCount <= 3
                              ? 'bg-primary-500'
                              : 'bg-success-500'
                            : 'bg-secondary-200 dark:bg-secondary-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'length', label: '8+ characters' },
                      { key: 'uppercase', label: 'Uppercase letter' },
                      { key: 'lowercase', label: 'Lowercase letter' },
                      { key: 'number', label: 'Number' },
                    ].map((item) => (
                      <span
                        key={item.key}
                        className={`flex items-center gap-1.5 transition-colors ${
                          passwordStrength[item.key as keyof typeof passwordStrength]
                            ? 'text-success-600 dark:text-success-400'
                            : 'text-secondary-400 dark:text-secondary-500'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              leftIcon={<Lock className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="flex items-start gap-3 py-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                size="lg"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Create Account
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-secondary-500 dark:text-secondary-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
