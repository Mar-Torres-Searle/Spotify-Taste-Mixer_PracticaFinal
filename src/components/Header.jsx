'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Header({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      <h1 className="text-green-500 font-bold text-xl">🎵 Spotify Taste Mixer</h1>
      <div className="flex items-center gap-4">
        {user?.images?.[0]?.url && (
          <img
            src={user.images[0].url}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-white text-sm">{user?.display_name}</span>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-full transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}