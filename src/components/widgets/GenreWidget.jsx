'use client';

import { useState } from 'react';

const GENRES = [
  'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient',
  'anime', 'blues', 'bossanova', 'chill', 'classical',
  'club', 'country', 'dance', 'disco', 'drum-and-bass',
  'edm', 'electronic', 'emo', 'folk', 'funk',
  'gospel', 'goth', 'grunge', 'happy', 'hard-rock',
  'hardcore', 'heavy-metal', 'hip-hop', 'house', 'indie',
  'indie-pop', 'jazz', 'k-pop', 'latin', 'metal',
  'minimal-techno', 'opera', 'party', 'piano', 'pop',
  'punk', 'punk-rock', 'r-n-b', 'reggae', 'reggaeton',
  'rock', 'rock-n-roll', 'sad', 'salsa', 'soul',
  'study', 'summer', 'techno', 'trance', 'trip-hop'
];

export default function GenreWidget({ selectedItems, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = GENRES.filter(genre =>
    genre.includes(search.toLowerCase())
  );

  function handleToggle(genre) {
    if (selectedItems.includes(genre)) {
      onSelect(selectedItems.filter(g => g !== genre));
    } else {
      if (selectedItems.length >= 4) return;
      onSelect([...selectedItems, genre]);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">🎸 Géneros</h2>
      <p className="text-gray-400 text-xs mb-3">Selecciona hasta 4 géneros</p>

      <input
        type="text"
        placeholder="Buscar género..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 mb-3 outline-none"
      />

      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
        {filtered.map(genre => (
          <button
            key={genre}
            onClick={() => handleToggle(genre)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              selectedItems.includes(genre)
                ? 'bg-green-500 text-black font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <p className="text-green-400 text-xs mt-3">
          Seleccionados: {selectedItems.join(', ')}
        </p>
      )}
    </div>
  );
}