import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, User } from '../types';
import { authStorage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authStorage.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const validatedUser = authStorage.validateUser(email, password);

    if (!validatedUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    authStorage.setCurrentUser(validatedUser);
    setUser(validatedUser);
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = authStorage.findUserByEmail(email);
    if (existingUser) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    authStorage.addUser({ ...newUser, password });
    authStorage.setCurrentUser(newUser);
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    authStorage.setCurrentUser(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
