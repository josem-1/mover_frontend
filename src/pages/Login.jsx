import React, {useState } from 'react';
import {Link } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';

export default function Login() {
  const {login } = useAuth();
  const [email,  setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,  setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Log In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Log In
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        New here? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
