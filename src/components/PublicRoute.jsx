import React from 'react';
import {Navigate } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';

export default function PublicRoute({children }) {
  const {user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return !user ? children : <Navigate to="/home" replace />; //ternary operator is new favorit operator
}
