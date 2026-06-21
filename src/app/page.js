'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    const url = getSpotifyAuthUrl();
    window.location.href = url;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">

      <h1 className="text-4xl font-bold mb-4">🎵 Spotify Taste Mixer</h1>

      <p className="text-gray-400 text-center max-w-md mb-8">
        Combina géneros, artistas y décadas para crear la playlist
        perfecta a partir de tus gustos musicales en Spotify.
      </p>

      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-colors"
      >
        Conectar con Spotify
      </button>

    </main>  
  );
}


