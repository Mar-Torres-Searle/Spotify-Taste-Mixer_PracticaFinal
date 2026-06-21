'use client';

import { useState, useEffect } from 'react';

export default function TrackCard({ track, onRemove }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
    setIsFavorite(favorites.some(f => f.id === track.id));
  }, [track.id]);

  // Snippet exacto del enunciado
  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
    const isFav = favorites.find(f => f.id === track.id);

    if (isFav) {
      const updated = favorites.filter(f => f.id !== track.id);
      localStorage.setItem('favorite_tracks', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(track);
      localStorage.setItem('favorite_tracks', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }

  function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-3 transition-colors group">
      
      {/* Portada */}
      {track.album?.images?.[0]?.url ? (
        <img
          src={track.album.images[0].url}
          alt={track.name}
          className="w-10 h-10 rounded object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-xs">🎵</span>
        </div>
      )}

      {/* Título y artista */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{track.name}</p>
        <p className="text-gray-400 text-xs truncate">{track.artists[0].name}</p>
      </div>

      {/* Duración */}
      <span className="text-gray-400 text-xs flex-shrink-0">
        {formatDuration(track.duration_ms)}
      </span>

      {/* Botón favorito */}
      <button
        onClick={toggleFavorite}
        className="flex-shrink-0 text-lg hover:scale-110 transition-transform"
        title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '⭐' : '☆'}
      </button>

      {/* Botón eliminar */}
      <button
        onClick={() => onRemove(track.id)}
        className="flex-shrink-0 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        title="Eliminar de la playlist"
      >
        ✕
      </button>

    </div>
  );
}