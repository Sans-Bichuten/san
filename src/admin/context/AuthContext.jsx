import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiFetch } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiFetch('/auth/check-auth.php', { method: 'GET' });
      if (data.isAuthenticated) {
        setAdmin(data.admin);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setAdmin(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    setAdmin(data.admin);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    try {
      await apiFetch('/auth/logout.php', { method: 'POST' });
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
