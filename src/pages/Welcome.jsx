import React from 'react';
import {Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Mover</h1>
      <p>Please <Link to="/signup">Sign Up</Link> or <Link to="/login">Log In</Link> to continue.</p>
    </div>
  );
}
