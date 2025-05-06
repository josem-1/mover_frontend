import React, {useEffect, useState } from 'react';
import {useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function DirectorPage() {
  const {id } = useParams();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCredits() {
      try {
        setLoading(true);
        const {data } = await api.get('/person/' + id + '/media');

        setTitles(data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to load director credits.');
      } finally {
        setLoading(false);
      }
    }
    fetchCredits();
  },[id]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{color: 'red' }}>{error}</p>;
//i hate frontend so much
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Director / Person ID: {id}</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {titles.map(item => (
          <li key={item.id}>
            <Link to={'/media/' + item.media_type + '/' + item.id}>
              {item.title || item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
