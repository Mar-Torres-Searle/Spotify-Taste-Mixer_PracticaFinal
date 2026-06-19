'use client';

import { useState } from 'react';

const GENRES = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient',
    'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova',
    'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house',
    'children', 'chill', 'classical', 'club', 'comedy',
    'country', 'dance', 'dancehall', 'death-metal', 'deep-house',
    'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub',
    'dubstep', 'edm', 'electro', 'electronic', 'emo',
    'folk', 'forro', 'french', 'funk', 'garage',
    'german', 'gospel', 'goth', 'grindcore', 'groove',
    'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore',
    'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm',
    'indian', 'indie', 'indie-pop', 'industrial', 'iranian',
    'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz',
    'k-pop', 'kids', 'latin', 'latino', 'malay',
    'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno',
    'movies', 'mpb', 'new-age', 'new-release', 'opera',
    'pagode', 'party', 'philippines-opm', 'piano', 'pop',
    'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock',
    'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae',
    'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly',
    'romance', 'sad', 'salsa', 'samba', 'sertanejo',
    'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter',
    'soul', 'soundtracks', 'spanish', 'study', 'summer',
    'swedish', 'synth-pop', 'tango', 'techno', 'trance',
    'trip-hop', 'turkish', 'work-out', 'world-music'
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