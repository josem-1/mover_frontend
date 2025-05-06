import React from 'react';
import {Navigate } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({children }) {
  const {user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;//might just take the loading out and let the website just spasm for second, user will be confused, heheh
  return user ? children : <Navigate to="/signup" replace />;//ternary operator is lowkey goated
}
 