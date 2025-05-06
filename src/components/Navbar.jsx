import React, {useState,useRef, useEffect } from 'react';
import {Link, useLocation } from 'react-router-dom';
import {useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';
//why did i choose this major...............................................................................................
export default function Navbar() {
  const {user, logout } = useAuth();
  const location = useLocation();//this should make sure the add to list button action only stays in that page'location' 
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // 
  const showNav = !['/', '/signup', '/login'].includes(location.pathname);
  if (!showNav) return null;

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/home" className="navbar__logo">MOVER</Link>
      </div>
      <div className="navbar__right" ref={ref}>
        <button className="navbar__account-btn" onClick={() => setOpen(o => !o)}>
          {user?.username || 'Account'} ▼
        </button>
        {open && (
          <div className="navbar__dropdown">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/watch-history">Watch History</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/" onClick={logout}>Logout</Link>

          </div>
        )}
      </div>
    </nav>
  );
}

