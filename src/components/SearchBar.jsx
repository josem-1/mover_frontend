import React, {useState } from 'react';
import {useNavigate, createSearchParams } from 'react-router-dom';//i hate this project i hate this project i hate this projec i aahta this projec it ajfoa fawaf jwoaf ewja;f woea fjwe;afj eawafj elw afewjl fjewaf jewrafnoerfnoer

const SEARCH_TYPES = [
  {value:'movie', label:'Movie' },
  {value:'tv',label: 'TV Show'},
  {value:'person',label: 'Director/Person'},
  {value:'genre', label:'Genre' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [type, setType]= useState('movie');
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!query.trim()) return; //trim takes off extra crap at beginining and end
    navigate({
      pathname:'/search',
      search: createSearchParams({type, q: query }).toString(), //switching between search route and controller adn this in the frontend is gonna make me break my laptop
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{flex: 1, padding: '0.5rem' }}
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        style={{padding: '0.5rem' }}
      >
        {SEARCH_TYPES.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button type="submit" style={{padding: '0.5rem 1rem' }}>
        Search
      </button>
    </form>
  );
}
