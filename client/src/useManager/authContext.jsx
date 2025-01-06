import URLs from "../constants/URLS";
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(URLs.info, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log("User not authenticated:", error);
      setUser(null);
    }
  };

  const login = async (userLoginData) => {
    try {
      const response = await axios.post(URLs.login, userLoginData,
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get(URLs.logout, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (userData) => {
    await axios.post(URLs.register, userData, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
