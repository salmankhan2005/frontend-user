import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  isSubscribed: boolean;
  login: () => void;
  logout: () => void;
  continueAsGuest: () => void;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setIsAuthenticated(false);
  };

  const subscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, isSubscribed, login, logout, continueAsGuest, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
