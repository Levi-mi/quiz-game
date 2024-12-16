import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/info', {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('User not authenticated:', error);
      setUser(null);
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/auth/login',
        userData,
        {
          withCredentials: true,
        }
      );

      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    await axios.get('http://localhost:3001/auth/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  const register = async (userData) => {
    await axios.post('http://localhost:3001/auth/register', userData, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
