'use client';

import { useState } from 'react';

const MOODS = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😢 Sad', value: 'sad' },
  { label: '⚡ Energetic', value: 'energetic' },
  { label: '😌 Calm', value: 'calm' },
];

export default function MoodWidget({ selectedItems, onSelect, sliders= { energy: 50, valence: 50, danceability: 50, acousticness: 50 }, onSlidersChange }) {
  const [energy, setEnergy] = useState(50);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [acousticness, setAcousticness] = useState(50);

  function handleToggle(value) {
    if (selectedItems.includes(value)) {
      onSelect(selectedItems.filter(m => m !== value));
    } else {
      onSelect([...selectedItems, value]);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">😊 Mood</h2>
      <p className="text-gray-400 text-xs mb-3">¿Cómo te quieres sentir?</p>

      {/* Selección de mood */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {MOODS.map(mood => (
          <button
            key={mood.value}
            onClick={() => handleToggle(mood.value)}
            className={`py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedItems.includes(mood.value)
                ? 'bg-green-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-3">

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-gray-400 text-xs">⚡ Energía</label>
            <span className="text-green-400 text-xs">{energy}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => {
                setEnergy(Number(e.target.value));
                onSlidersChange({ ...sliders, energy: Number(e.target.value) });
            }}
            className="w-full accent-green-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-gray-400 text-xs">😊 Positividad (Valence)</label>
            <span className="text-green-400 text-xs">{valence}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={valence}
            onChange={(e) => {
                setValence(Number(e.target.value));
                onSlidersChange({ ...sliders, valence: Number(e.target.value) });
            }}
            className="w-full accent-green-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-gray-400 text-xs">💃 Danceability</label>
            <span className="text-green-400 text-xs">{danceability}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={danceability}
            onChange={(e) => {
                setDanceability(Number(e.target.value));
                onSlidersChange({ ...sliders, danceability: Number(e.target.value) });
            }}
            className="w-full accent-green-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-gray-400 text-xs">🎸 Acousticness</label>
            <span className="text-green-400 text-xs">{acousticness}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={acousticness}
            onChange={(e) => {
                setAcousticness(Number(e.target.value));
                onSlidersChange({ ...sliders, acousticness: Number(e.target.value) });
            }}
            className="w-full accent-green-500"
          />
        </div>

      </div>

      {selectedItems.length > 0 && (
        <p className="text-green-400 text-xs mt-3">
          Mood: {selectedItems.join(', ')}
        </p>
      )}
    </div>
  );
}