'use client';

import { useState } from 'react';
import TrackCard from './TrackCard';
import { generatePlaylist, savePlaylistToSpotify } from '@/lib/spotify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function PlaylistDisplay({ preferences, userId }) {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(null);

  // Del enunciado: eliminar track
  function removeTrack(trackId) {
    setPlaylist(playlist.filter(track => track.id !== trackId));
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const tracks = await generatePlaylist(preferences);
      if (tracks.length === 0) {
        setError('No se encontraron canciones con esas preferencias. Prueba a cambiar los filtros.');
      } else {
        setPlaylist(tracks);
      }
    } catch (err) {
      console.error('Error generando playlist:', err);
      setError('Error al generar la playlist. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMore() {
    setLoading(true);
    setError(null);
    try {
      const newTracks = await generatePlaylist(preferences);
      const currentIds = new Set(playlist.map(t => t.id));
      const unique = newTracks.filter(t => !currentIds.has(t.id));
      setPlaylist([...playlist, ...unique]);
    } catch (err) {
      setError('Error al añadir canciones.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSavedMessage(null);
    try {
      const savedPlaylist = await savePlaylistToSpotify(userId, playlist);
      setSavedMessage(`✅ Playlist "${savedPlaylist.name}" guardada en Spotify!`);
    } catch (err) {
      setSavedMessage('❌ Error al guardar la playlist. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  }

  function handleDragEnd(result) {
    if (!result.destination) return;
    
    const items = Array.from(playlist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setPlaylist(items);
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 h-full flex flex-col">

      {/* Cabecera */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-lg">🎵 Tu Playlist</h2>
        <span className="text-gray-400 text-sm">{playlist.length} canciones</span>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-2 mb-6">
        <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-semibold py-2 rounded-full transition-colors"
        >
            {loading ? 'Generando...' : '✨ Generar Playlist'}
        </button>

        {playlist.length > 0 && (
            <div className="flex gap-2">
            <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full transition-colors"
                title="Refrescar playlist"
            >
                🔄 Refrescar
            </button>
            <button
                onClick={handleAddMore}
                disabled={loading}
                className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full transition-colors"
                title="Añadir más canciones"
            >
                ➕ Añadir más
            </button>
            <button
                onClick={handleSave}
                disabled={saving || playlist.length === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-semibold px-4 py-2 rounded-full transition-colors text-sm"
                title="Guardar en Spotify"
            >
                {saving ? '💾 Guardando...' : '💾 Guardar'}
            </button>
            </div>
        )}
      </div>

      {savedMessage && (
        <p className={`text-sm mb-4 ${savedMessage.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {savedMessage}
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {/* Lista de canciones */}
      {playlist.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-4xl mb-4">🎵</p>
          <p className="text-gray-400">Selecciona tus preferencias en los widgets y genera tu playlist</p>
        </div>
        ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="playlist">
                {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-2 overflow-y-auto flex-1"
                >
                    {playlist.map((track, index) => (
                    <Draggable key={track.id} draggableId={track.id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TrackCard
                            track={track}
                            onRemove={removeTrack}
                            />
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
      )}

    </div>
  );
}