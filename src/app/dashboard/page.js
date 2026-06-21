'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getAccessToken, logout } from '@/lib/auth';
import Header from '@/components/Header';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import TrackWidget from '@/components/widgets/TrackWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PlaylistDisplay from '@/components/PlaylistDisplay';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [playlist, setPlaylist] = useState([]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([0, 100]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState([]);


  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
      return;
    }

    const fetchUser = async () => {
      const token = getAccessToken();
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header user={user} />
      <div className="flex flex-col sm:flex-row gap-6 p-6">

        {/*  Widgets */}
        <aside className="w-full sm:w-80 flex flex-col gap-4">
            <GenreWidget
                selectedItems={selectedGenres}
                onSelect={setSelectedGenres}
            />
            <ArtistWidget
                selectedItems={selectedArtists}
                onSelect={setSelectedArtists}
            />
            <TrackWidget
                selectedItems={selectedTracks}
                onSelect={setSelectedTracks}
            />
            <DecadeWidget
                selectedItems={selectedDecades}
                onSelect={setSelectedDecades}
            />
            <PopularityWidget
                selectedItems={selectedPopularity}
                onSelect={setSelectedPopularity}
            />
            <MoodWidget
                selectedItems={selectedMood}
                onSelect={setSelectedMood}
            />
        </aside>

        {/* Playlist */}
        <main className="flex-1">
            <PlaylistDisplay
                preferences={{ 
                artists: selectedArtists,
                genres: selectedGenres,
                decades: selectedDecades,
                popularity: selectedPopularity,
                moods: selectedMood,
                tracks: selectedTracks
                }}
                userId={user.id}
            />
        </main>

      </div>
    </div>
  );
}