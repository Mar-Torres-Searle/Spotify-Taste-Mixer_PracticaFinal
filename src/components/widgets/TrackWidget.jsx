'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

export default function TrackWidget({ selectedItems, onSelect }) {
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
          `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(search)}&limit=5`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await response.json();
        setResults(data.tracks.items);
      } catch (error) {
        console.error('Error buscando canciones:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleToggle(track) {
    const isSelected = selectedItems.find(t => t.id === track.id);
    if (isSelected) {
      onSelect(selectedItems.filter(t => t.id !== track.id));
    } else {
      onSelect([...selectedItems, track]);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
        <h2 className="text-white font-semibold mb-3">🎵 Canciones</h2>
        <p className="text-gray-400 text-xs mb-3">Busca y selecciona canciones</p>

        <input
            type="text"
            placeholder="Buscar canción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 mb-3 outline-none"
        />

        {loading && <p className="text-gray-400 text-xs mb-2">Buscando...</p>}

        {results.length > 0 && (
            <div className="flex flex-col gap-2 mb-3 max-h-40 overflow-y-auto">
            {results.map(track => (
                <button
                key={track.id}
                onClick={() => handleToggle(track)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    selectedItems.find(t => t.id === track.id)
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                >
                {track.album?.images?.[0]?.url && (
                    <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-8 h-8 rounded object-cover"
                    />
                )}
                <div>
                    <p className="text-sm font-medium">{track.name}</p>
                    <p className="text-xs opacity-70">{track.artists[0].name}</p>
                </div>
                </button>
            ))}
            </div>
        )}

        {selectedItems.length > 0 && (
            <div>
                <p className="text-gray-400 text-xs mb-2">Seleccionadas:</p>
                <div className="flex flex-col gap-1">
                {selectedItems.map(track => (
                    <button
                    key={track.id}
                    onClick={() => onSelect(selectedItems.filter(t => t.id !== track.id))}
                    className="bg-green-500 text-black text-xs px-2 py-1 rounded-full hover:bg-red-500 transition-colors"
                    >
                    {track.name} — {track.artists[0].name} ✕
                    </button>
                ))}
                </div>
            </div>
        )}
    </div>
  );
}