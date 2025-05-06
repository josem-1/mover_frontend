// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Carousel from '../components/Carousel';

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory]= useState([]);
  const [genreCounts, setGenreCounts] = useState([]);
  const [directorCounts, setDirectorCounts] = useState([]);
  const [loading, setLoading]= useState(true);
  const [error, setError] = useState(''); //starting to see the words 'useState' in my dreams, i am going freaking mad
  //why did i choose this major.........

  useEffect(() => {
    async function fetchData(){
      try{
        setLoading(true);
        const [wlRes, histRes] = await Promise.all([
          api.get('/user/watchlist'),
          api.get('/user/watchhistory')
        ]);
        const wl   = wlRes.data.watchlist;
        const hist = histRes.data.watchHistory;
        setWatchlist(wl);
        setHistory(hist);

        const genreMap = {};
        hist.forEach(({ genres }) =>
          genres.forEach(g => (genreMap[g] = (genreMap[g] || 0) + 1))
        );
        const genresArr = Object.entries(genreMap)
          .map(([genre, count]) => ({ genre, count }))
          .sort((a, b) => b.count - a.count);
        setGenreCounts(genresArr);//definatly aint gonna try to have some ranking visualization for this crap. this was hard as is

        
        const dirMap = {};
        hist.forEach(entry => {
          const d = entry.director || 'Unknown';
          dirMap[d] = (dirMap[d] || 0) + 1;
        });
        const dirsArr = Object.entries(dirMap)
          .map(([director, count]) => ({ director, count }))
          .sort((a, b) => b.count - a.count);
        setDirectorCounts(dirsArr);
      } catch (err) {
        console.error(err);
        setError('failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading dashboard…</p>;
  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Your Watchlist ({watchlist.length})</h2>
        {watchlist.length === 0 ? (
          <p>You don’t have any items in your watchlist.</p>
        ) : (
          <Carousel
            items={watchlist}
            renderItem={item => (
              <Link
                to={`/media/${item.mediaType}/${item.mediaId}`}
                style={{ textDecoration: 'none', color: '#000', textAlign: 'center' }}
              >
                {item.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w154${item.posterPath}`}
                    alt={item.title}
                    style={{ width: '100px', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ width: '100px', height: '150px', background: '#ccc' }} />
                )}
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {item.title}
                </p>
              </Link>
            )}
          />
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Your Watch History ({history.length})</h2>
        {history.length === 0 ? (
          <p>You haven’t watched anything yet.</p>
        ) : (
          <Carousel
            items={history}
            renderItem={item => (
              <Link
                to={`/media/${item.mediaType}/${item.mediaId}`}
                style={{ textDecoration: 'none', color: '#000', textAlign: 'center' }}
              >
                {item.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w154${item.posterPath}`}
                    alt={item.title}
                    style={{ width: '100px', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ width: '100px', height: '150px', background: '#ccc' }} />
                )}
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </Link>
            )}
          />
        )}
      </section>

      {/* Most Watched Genres */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Most Watched Genres</h2>
        {genreCounts.length === 0 ? (
          <p>No genre data yet.</p>
        ) : (
          <ol>
            {genreCounts.map(({ genre, count }) => (
              <li key={genre}>
                {genre}: {count} time{count !== 1 && 's'}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Most Watched Directors</h2>
        {directorCounts.length === 0 ? (
          <p>No director data yet.</p>
        ) : (
          <ol>
            {directorCounts.map(({ director, count }) => (
              <li key={director}>
                {director}: {count} time{count !== 1 && 's'}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
