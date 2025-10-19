// src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthStore = {
  user: User | null;
  login: (email: string) => boolean; // Returns true on success
  logout: () => void;
};

// This is a MOCK login. In a real app, you'd check a password.
const mockLogin = (email: string): User | null => {
  if (email.toLowerCase() === 'admin@icecream.com') {
    return {
      name: 'Admin User',
      email: 'admin@icecream.com',
      isAdmin: true,
    };
  }
  if (email.toLowerCase() === 'user@icecream.com') {
    return {
      name: 'Regular User',
      email: 'user@icecream.com',
      isAdmin: false,
    };
  }
  return null; // Login failed
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, // User is logged out by default
      
      login: (email) => {
        const loggedInUser = mockLogin(email);
        if (loggedInUser) {
          set({ user: loggedInUser });
          return true; // Login was successful
        }
        return false; // Login failed
      },
      
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);