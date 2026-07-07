import { User } from '../types';

const USERS_KEY = 'smart_bharat_users';
const CURRENT_USER_KEY = 'smart_bharat_current_user';

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  addUser: (user: User): void => {
    const users = storage.getUsers();
    users.push(user);
    storage.saveUsers(users);
  },

  findUserByEmail: (email: string): User | undefined => {
    const users = storage.getUsers();
    return users.find((u) => u.email === email);
  },

  validateUser: (email: string, password: string): { email: string; password: string } | undefined => {
    const users = storage.getUsers();
    return users.find(
      (u) => u.email === email && (users as unknown as Record<string, string>[]).find(u => u.email === email)?.password === password
    ) ? { email, password } : undefined;
  },
};

interface StoredUser extends User {
  password: string;
}

export const authStorage = {
  getUsers: (): StoredUser[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: StoredUser[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  addUser: (user: StoredUser): void => {
    const users = authStorage.getUsers();
    users.push(user);
    authStorage.saveUsers(users);
  },

  findUserByEmail: (email: string): StoredUser | undefined => {
    const users = authStorage.getUsers();
    return users.find((u) => u.email === email);
  },

  validateUser: (email: string, password: string): User | null => {
    const users = authStorage.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },
};
