'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

export default function ArtistWidget({ selectedItems, onSelect }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const token = getAccessToken();
        const response = await fetch(
          `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(search)}&limit=5`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await response.json();
        setResults(data.artists.items);
      } catch (error) {
        console.error('Error buscando artistas:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleToggle(artist) {
    const isSelected = selectedItems.find(a => a.id === artist.id);
    if (isSelected) {
      onSelect(selectedItems.filter(a => a.id !== artist.id));
    } else {
      if (selectedItems.length >= 5) return;
      onSelect([...selectedItems, artist]);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">🎤 Artistas</h2>
      <p className="text-gray-400 text-xs mb-3">Busca y selecciona hasta 5 artistas</p>

      <input
        type="text"
        placeholder="Buscar artista..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 mb-3 outline-none"
      />

      {loading && <p className="text-gray-400 text-xs mb-2">Buscando...</p>}

      {results.length > 0 && (
        <div className="flex flex-col gap-2 mb-3 max-h-40 overflow-y-auto">
          {results.map(artist => (
            <button
              key={artist.id}
              onClick={() => handleToggle(artist)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                selectedItems.find(a => a.id === artist.id)
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {artist.images?.[0]?.url && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm">{artist.name}</span>
            </button>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div>
          <p className="text-gray-400 text-xs mb-2">Seleccionados:</p>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(artist => (
              <span
                key={artist.id}
                className="bg-green-500 text-black text-xs px-2 py-1 rounded-full"
              >
                {artist.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}