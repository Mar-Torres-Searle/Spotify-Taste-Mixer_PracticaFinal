import { getAccessToken } from './auth'

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity, tracks, moods } = preferences;
  const token = getAccessToken();
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
    console.log('Respuesta género:', data); 
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