'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getAccessToken, logout } from '@/lib/auth';
import Header from '@/components/Header';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import ArtistWidget from '@/components/widgets/ArtistWidget';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [playlist, setPlaylist] = useState([]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([0, 100]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);


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
      <div className="flex gap-6 p-6">

        {/*  Widgets */}
        <aside className="w-80 flex flex-col gap-4">
            <GenreWidget
                selectedItems={selectedGenres}
                onSelect={setSelectedGenres}
            />
            <ArtistWidget
                selectedItems={selectedArtists}
                onSelect={setSelectedArtists}
            />
            <DecadeWidget
                selectedItems={selectedDecades}
                onSelect={setSelectedDecades}
            />
            <PopularityWidget
                selectedItems={selectedPopularity}
                onSelect={setSelectedPopularity}
            />
        </aside>

        {/* Playlist */}
        <main className="flex-1">
          <p className="text-gray-400 text-sm">Playlist aquí</p>
        </main>

      </div>
    </div>
  );
}