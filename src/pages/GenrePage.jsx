import React, {useEffect, useState } from 'react';
import {useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function GenrePage() {
  const {id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const {data } = await api.get('/genre/' + id);
        setMovies(data.movies);
      } catch (err) {
        console.error(err);
        setError('Failed to load movies for this genre.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Genre: {id}</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map(m => (
          <li key={m.id}>
            <Link to={'/media/movie/' + m.id}>
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
