# 🎵 Spotify Taste Mixer

Aplicación web que genera playlists personalizadas de Spotify basándose en las preferencias musicales del usuario mediante widgets configurables.

## 🚀 Tecnologías

- [Next.js 16](https://nextjs.org/) — framework de React
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — datos musicales
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) — drag & drop

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mar-Torres-Searle/Spotify-Taste-Mixer_PracticaFinal.git
cd Spotify-Taste-Mixer_PracticaFinal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear aplicación en Spotify Developer

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Crea una nueva app
3. Añade `http://127.0.0.1:3000/auth/callback` como Redirect URI
4. Guarda tu **Client ID** y **Client Secret**

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:
# 🎵 Spotify Taste Mixer

Aplicación web que genera playlists personalizadas de Spotify basándose en las preferencias musicales del usuario mediante widgets configurables.

## 🚀 Tecnologías

- [Next.js 16](https://nextjs.org/) — framework de React
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — datos musicales
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) — drag & drop

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mar-Torres-Searle/Spotify-Taste-Mixer_PracticaFinal.git
cd Spotify-Taste-Mixer_PracticaFinal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear aplicación en Spotify Developer

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Crea una nueva app
3. Añade `http://127.0.0.1:3000/auth/callback` como Redirect URI
4. Guarda tu **Client ID** y **Client Secret**

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:
# 🎵 Spotify Taste Mixer

Aplicación web que genera playlists personalizadas de Spotify basándose en las preferencias musicales del usuario mediante widgets configurables.

## 🚀 Tecnologías

- [Next.js 16](https://nextjs.org/) — framework de React
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — datos musicales
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) — drag & drop

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mar-Torres-Searle/Spotify-Taste-Mixer_PracticaFinal.git
cd Spotify-Taste-Mixer_PracticaFinal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear aplicación en Spotify Developer

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Crea una nueva app
3. Añade `http://127.0.0.1:3000/auth/callback` como Redirect URI
4. Guarda tu **Client ID** y **Client Secret**

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_client_id
NEXT_PUBLIC_REDIRECT_URI=http://127.0.0.1:3000/auth/callback

### 5. Arrancar el proyecto

```bash
npm run dev
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000) en tu navegador.

## 🧩 Funcionalidades

### Widgets de preferencias
- **🎸 Géneros** — selección múltiple de géneros musicales (hasta 4)
- **🎤 Artistas** — búsqueda y selección de artistas favoritos (hasta 5)
- **🎵 Canciones** — búsqueda y selección de canciones semilla
- **📅 Décadas** — filtro por época musical
- **📊 Popularidad** — filtro por nivel de popularidad
- **😊 Mood** — selección de estado de ánimo y características de audio

### Gestión de playlist
- ✨ Generación automática basada en preferencias
- 🔄 Refrescar para obtener canciones distintas
- ➕ Añadir más canciones a la playlist actual
- ⭐ Marcar canciones como favoritas (guardadas en localStorage)
- ✕ Eliminar canciones individuales
- 🖱️ Reordenar canciones con drag & drop
- 💾 Guardar playlist directamente en Spotify

## 🔐 Autenticación

La app usa OAuth 2.0 de Spotify con:
- Validación CSRF mediante parámetro `state`
- Refresh automático de token
- Tokens almacenados de forma segura en localStorage
