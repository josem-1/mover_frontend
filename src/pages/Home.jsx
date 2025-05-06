import React, {useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import api from '../api/axios';
import {Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoading(true);
        const [mvRes, tvRes] = await Promise.all([
          api.get('/trending/movie'),
          api.get('/trending/tv'),
        ]);
        setMovies(mvRes.data.results || []);
        setTvShows(tvRes.data.results || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load trending content.');
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Home</h1>
      <SearchBar />

      {loading && <p>Loading trending…</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <section style={{ marginTop: '2rem' }}>
            <h2>Trending Movies</h2>
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '1rem',
              padding: '1rem 0'
            }}>
              {movies.map(m => (
                <Link
                  key={m.id}
                  to={'/media/movie/' + m.id}

                  style={{ minWidth: '150px', textAlign: 'center', textDecoration: 'none', color: '#000' }}
                >
                  {m.poster_path ? (
                    <img
                    src={'https://image.tmdb.org/t/p/w154' + m.poster_path}

                      alt={m.title}
                      style={{ width: '100%', borderRadius: '4px' }}
                    />
                  ) : (
                    <div style={{ height: '230px', background: '#ccc' }} />
                  )}
                  <p style={{ marginTop: '0.5rem' }}>{m.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h2>Trending TV Shows</h2>
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '1rem',
              padding: '1rem 0'
            }}>
              {tvShows.map(show => (
                <Link
                  key={show.id}
                  to={'/media/tv/' + show.id}

                  style={{ minWidth: '150px', textAlign: 'center', textDecoration: 'none', color: '#000' }}
                >
                  {show.poster_path ? (
                    <img
                    src={'https://image.tmdb.org/t/p/w154' + show.poster_path}

                      alt={show.name}
                      style={{ width: '100%', borderRadius: '4px' }}
                    />
                  ) : (
                    <div style={{ height: '230px', background: '#ccc' }} />
                  )}
                  <p style={{ marginTop: '0.5rem' }}>{show.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}


