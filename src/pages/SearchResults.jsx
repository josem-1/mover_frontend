import React, {useEffect, useState } from 'react';
import {useLocation, Link } from 'react-router-dom';
import api from '../api/axios';

export default function SearchResults() {
  const { search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);
  const type = params.get('type');
  const q  = params.get('q');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!type || !q) return;

    setLoading(true);
    api.get('/search?type='+type +'&q='+ encodeURIComponent(q))//i hate this major so much
      .then(res => {
        setResults(res.data.results || []);
        setError('');
      })
      .catch(err => {
        console.error('Search API axios error obj:', err);
        console.error('Search API response data:', err.response?.data);
        console.error('Search API status:', err.response?.status);
        const msg =
          err.response?.data?.message ||
         err.message("idk what is happening anymore");
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [type, q]);

  if (!type || !q) {
    return <p style={{ padding: '1rem' }}>No search query provided.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Results for "{q}" ({type})</h1>
      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map(item => {
            if (type === 'movie' || type === 'tv') {
                return (
                    <li key={item.id}>
                        <Link to={`/media/${type}/${item.id}`}>
                        {item.title || item.name}
                        </Link>
                    </li>
                );
            }
            if (type === 'genre') {
                return (
                    <li key={item.id}>
                        <Link to={`/genre/${item.id}`}>
                        {item.name}
                        </Link>
                    </li>
                );
            }
            if (type === 'person') {
                return (
                    <li key={item.id}>
                        <Link to={`/director/${item.id}`}>
                        {item.name}
                        </Link>
                    </li>
                );
            }
            return null;





          
        })}
      </ul>
    </div>
  );
}
