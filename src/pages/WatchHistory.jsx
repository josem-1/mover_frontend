import React, {useEffect, useState } from 'react';
import api from '../api/axios';
import {Link } from 'react-router-dom';

export default function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]  = useState('');

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const {data } = await api.get('/user/watchhistory');
        setHistory(data.watchHistory);
      } catch (err) {
        console.error(err);
        setError('Failed to load watch history.');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const handleRemove = async (mediaId) => {
    try {
      await api.delete('/user/watchhistory/' + mediaId);
      setHistory(current =>
        current.filter(item => item.mediaId !== mediaId)
      );
    } catch (err) {
      console.error('Failed to delete from watch history:', err);
      
    }
  };

  if (loading) return <p style={{padding: '1rem' }}>Loading…</p>;
  if (error) return <p style={{ padding:'1rem',color: 'red' }}>{error}</p>;
  if (history.length === 0) {
    return <p style={{ padding:'1rem' }}>You haven’t marked anything as watched yet.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Watch History</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map(item => (
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
            <div style={{ flex: 1 }}>
              <Link
                to={'/media/' + item.mediaType + '/' + item.mediaId}
                style={{ fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', color: '#fff' }}
              >
                {item.title}
              </Link>
              <p style={{ margin: 0, color: '#666' }}>
                {item.mediaType.toUpperCase()} • Watched on{' '}
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
