
import React, {useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Carousel from '../components/Carousel';

export default function MediaDetail() {
  

  const {type, id } = useParams();
  const [media, setMedia] = useState(null);
  const [similar, setSimilar]= useState([]);
  const [providers, setProviders] = useState({});
  const [loading, setLoading]  = useState(true);
  const [error, setError] = useState(''); //use state usestate usestate usestate i hate this 

  const [wlStatus, setWlStatus] = useState('idle');
  const [histStatus, setHistStatus] = useState('idle');

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [detailRes, simRes, provRes] = await Promise.all([
          api.get('/media/' + type + '/' + id),
          api.get('/media/' + type + '/' + id + '/similar'),
          api.get('/media/' + type + '/' + id + '/providers'),
        ]);

        setMedia(detailRes.data.media);
        setSimilar(simRes.data.results || []);
        
        setProviders(provRes.data.providers || {});
      } catch (err) {
        console.error(err);
        setError('Failed to load media details.');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [type, id]);

  const buildEntry = () => ({
    mediaId:    media.id,
    mediaType:  media.type,
    title:      media.title,
    posterPath: media.posterPath, 
    genres:     media.genres,
    director:   media.director
  });

  const handleAddToWatchlist = async () => {
    setWlStatus('loading');
    try {
      await api.post('/user/watchlist', { media: buildEntry() });
      setWlStatus('success');
    } catch {
      setWlStatus('error');
    }
  };

  const handleAddToHistory = async () => {
    setHistStatus('loading');
    try {
      await api.post('/user/watchhistory', {media: buildEntry() });
      setHistStatus('success');
    } catch {
      setHistStatus('error');
    }
  };

  if (loading) return <p style={{ padding: '1rem' }}>Loading…</p>;


  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

  if (!media) return <p style={{ padding: '1rem' }}>No media found.</p>;

  // Providers: tmdb has us vs non-us not sure why, shows both but us first
  const region = providers.US ? 'US' : Object.keys(providers)[0];
  const provs = providers[region] || {};
  const flatrate = provs.flatrate || [];
  const rent = provs.rent   || [];
  const buy  = provs.buy  || [];

  return (
    <div style={{padding: '1rem' }}>
      <Link to="/home" style={{textDecoration: 'none' }}>← Back to Home</Link>

      <div style={{display:'flex', gap: '1rem', marginTop: '1rem' }}>
        {media.posterPath && (<img
          src={'https://image.tmdb.org/t/p/w300' + media.posterPath}
            alt={media.title}
            style={{ borderRadius: '4px' }}
          />
        )}
        <div>
          <h1>{media.title}</h1>
          {media.overview && (
            <p style={{ marginTop: '0.5rem', maxWidth: '600px' }}>
              {media.overview}
            </p>
          )}
          {media.director && (
            <p><strong>Director:</strong> {media.director}</p>
          )}
          {media.genres?.length > 0 && (
            <p><strong>Genres:</strong> {media.genres.join(', ')}</p>
          )}

          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleAddToWatchlist}
              disabled={wlStatus === 'loading' || wlStatus === 'success'}
              style={{
                padding: '0.5rem 1rem',
                cursor: wlStatus === 'loading' ? 'wait' : 'pointer'
              }}
            >
              {wlStatus==='idle' && 'Add to Watchlist'}
              {wlStatus==='loading' && 'Adding…'}
              {wlStatus==='success' && 'Added!'}
              {wlStatus==='error' && 'Error!'}
            </button>

            <button
              onClick={handleAddToHistory}
              disabled={histStatus === 'loading' || histStatus === 'success'}
              style={{
                padding: '0.5rem 1rem',
                cursor: histStatus === 'loading' ? 'wait' : 'pointer'
              }}
            >
              {histStatus=== 'idle'&& 'Mark as Watched'}
              {histStatus==='loading' && 'Saving…'}
              {histStatus==='success' && 'Saved!'}
              {histStatus==='error'&& 'Error!'}
            </button>
          </div>
        </div>
      </div>

      <section style={{ marginTop: '2rem' }}>
        <h2>Where to watch</h2>
        {!region ? (
          <p>Provider info not available.</p>
        ) : (
          <>
            {flatrate.length > 0 && (
              <>
                <h3>Streaming</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {flatrate.map(p => (
                    <img
                      key={p.provider_id}
                      src={"https://image.tmdb.org/t/p/w92" + p.logo_path}
                      alt={p.provider_name}
                      title={p.provider_name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </>
            )}
            {rent.length > 0 && (
              <>
                <h3>Rent</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {rent.map(p => (
                    <img
                      key={p.provider_id}
                      src={"https://image.tmdb.org/t/p/w92" + p.logo_path}                      alt={p.provider_name}
                      title={p.provider_name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </>
            )}
            {buy.length > 0 && (
              <>
                <h3>Buy</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {buy.map(p => (
                    <img
                      key={p.provider_id}
                      src={"https://image.tmdb.org/t/p/w92" + p.logo_path}                      alt={p.provider_name}
                      title={p.provider_name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Recommendations {type === 'movie' ? 'Movies' : 'TV Shows'}</h2>
        {similar.length === 0 ? (
          <p>No similar content found.</p>
          
        ) : (
          
          
          
          <Carousel
            items={similar.slice(0, 10)}
            renderItem={item => (
              <Link
                to={`/media/${type}/${item.id}`}
                style={{ textDecoration: 'none', color: '#000', textAlign: 'center' }}
              >
                {item.poster_path ? (
                  <img
                  src={"https://image.tmdb.org/t/p/w154" + item.poster_path}
                    alt={item.title || item.name}
                    style={{ width: '100px', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{ width: '100px', height: '150px', background: '#ccc' }} />
                )}
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {item.title || item.name}
                </p>
              </Link>
            )}
          />
        )}
      </section>
    </div>
  );
}
