import './globals.css'

export const metadata = {
  title: 'Spotify Taste Mixer',
  description: 'Generador de playlists personalizadas con Spotify',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}