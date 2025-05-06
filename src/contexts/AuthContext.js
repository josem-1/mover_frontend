import React, {createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import {useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //checks if authorized user, gotta map this out at sompoitn for document
  useEffect(() => {
    api.get('/auth/authcheck')
      .then(res => setUser(res.data.user))
      .catch(err => {
        if (err.response?.status !== 401) console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const signup = async (username, email, password) => {
    const {data } = await api.post('/auth/signup', { username, email, password });
    setUser(data.user);
    navigate('/home', { replace: true });
  };

  const login = async (email, password) => {
    const {data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    navigate('/home', { replace: true });
  };

  const logout = async () => {
    await api.get('/auth/logout');
    setUser(null);
    navigate('/signup', { replace: true });
  };

  return (
    <AuthContext.Provider value={{user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
