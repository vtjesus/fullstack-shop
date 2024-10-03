"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

type UserContextType = {
  user: any | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({ user: null, loading: true, refreshUser: async () => {} });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);