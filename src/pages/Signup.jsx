import React, {useState } from 'react';
import {Link } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const {signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [error,  setError]= useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(username, email, password);
    } catch (err) {
      
      setError(err.response?.data?.message || 'Failed to sign up');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center'}}>Welcome to Mover! <br/> Sign Up Now!</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>
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
            background: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
