import React, {useEffect, useState } from 'react';
import api from '../api/axios';
import {Link } from 'react-router-dom';

export default function Watchlist() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState('');

//copied from watchhistory, showuld work, if not, idk man, idk
  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true);
        const { data } = await api.get('/user/watchlist');
        setList(data.watchlist);
      } catch (err) {
        console.error(err);
        setError('Failed to load watchlist.');
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  const handleRemove = async (mediaId) => {
    try {
      await api.delete('/user/watchlist/' + mediaId);
      setList(current =>
        current.filter(item => item.mediaId !== mediaId)
      );
    } catch (err) {
      console.error('Failed to delete from watchlist:', err);
    }
  };
  
  if (loading) return <p style={{ padding: '1rem' }}>Loading…</p>;
  if (error)   return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;
  if (list.length === 0) {
    return <p style={{ padding: '1rem' }}>Your watchlist is empty.</p>;
  }

  return (
    <div style={{padding: '1rem' }}>
      <h1>Your Watchlist</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {list.map(item => (
          <li
          key={item.mediaType + '-' + item.mediaId + '-' + item.createdAt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '1rem 0'
            }}
          >
            {item.posterPath && (
              <img
              src={'https://image.tmdb.org/t/p/w92' + item.posterPath}
                alt={item.title}
                style={{ borderRadius: '4px' }}
              />
            )}
            <div style={{flex: 1 }}>
              <Link
                to={'/media/' + item.mediaType + '/' + item.mediaId}
                style={{fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', color: '#fff' }}
              >
                {item.title}
              </Link>
              <p style={{margin: 0, color: '#666' }}>
                {item.mediaType.toUpperCase()} • Added{' '}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleRemove(item.mediaId)}
              style={{
                padding: '0.5rem',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
