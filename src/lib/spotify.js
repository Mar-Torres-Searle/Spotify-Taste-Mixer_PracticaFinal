import { getAccessToken } from './auth'

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity, tracks, moods } = preferences;
  let token = getAccessToken();
  if (!token) {
    token = await refreshAccessToken();
    if (!token) {
      window.location.href = '/';
      return [];
    }
  }
  const offset = Math.floor(Math.random() * 50);
  let allTracks = [];

  // 1. Obtener top tracks de artistas seleccionados
  for (const artist of artists) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=artist:${encodeURIComponent(artist.name)}&limit=10&offset=${offset}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    const data = await response.json();
    if (data.tracks?.items) {
      allTracks.push(...data.tracks.items);
    }
  }

  // 2. Buscar por géneros
  for (const genre of genres) {
    const results = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=genre:${encodeURIComponent(genre)}&limit=10&offset=${offset}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    const data = await results.json();
    if (data.tracks?.items) {
      allTracks.push(...data.tracks.items);
    }
  }

  // 3. Buscar por canciones similares a las seleccionadas
  for (const track of tracks) {
    const results = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(track.artists[0].name + ' ' + track.name)}&limit=5&offset=${offset}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await results.json();
    if (data.tracks?.items) {
      allTracks.push(...data.tracks.items);
    }
  }

  // 4. Buscar por moods seleccionados
  for (const mood of moods) {
    const results = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${mood}&limit=10&offset=${offset}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await results.json();
    if (data.tracks?.items) {
      allTracks.push(...data.tracks.items);
    }
  }

  // 5. Filtrar por década
  if (decades.length > 0) {
    allTracks = allTracks.filter(track => {
      const year = new Date(track.album.release_date).getFullYear();
      return decades.some(decade => {
        const decadeStart = parseInt(decade);
        return year >= decadeStart && year < decadeStart + 10;
      });
    });
  }

  // 6. Filtrar por popularidad
  if (popularity) {
    const [min, max] = popularity;
    allTracks = allTracks.filter(track => {
      if (track.popularity === undefined) return true;
      return track.popularity >= min && track.popularity <= max;
    });
  }

  // 7. Eliminar duplicados y limitar a 30 canciones
  const uniqueTracks = Array.from(
    new Map(allTracks.map(track => [track.id, track])).values()
  ).slice(0, 30);

  return uniqueTracks;
}

export async function savePlaylistToSpotify(userId, tracks) {
  const token = getAccessToken();

  // 1. Crear la playlist vacía
  const createResponse = await fetch(
    `https://api.spotify.com/v1/me/playlists`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Spotify Taste Mixer 🎵',
        description: 'Playlist generada con Spotify Taste Mixer',
        public: false
      })
    }
  );

  const playlist = await createResponse.json();

  if (!createResponse.ok) {
    throw new Error(playlist.error?.message || 'Error al crear la playlist');
  }

  // 2. Añadir las canciones a la playlist
  const uris = tracks.map(track => track.uri);

  await new Promise(resolve => setTimeout(resolve, 1000));

  const addResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist.id}/items`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris })
    }
  );


  if (!addResponse.ok) {
    throw new Error('Error al añadir canciones a la playlist');
  }

  return playlist;
}