'use client';

const POPULARITY_OPTIONS = [
  { label: '🔥 Mainstream', description: 'Los hits más escuchados', value: [80, 100] },
  { label: '🎵 Popular', description: 'Conocidas pero no masivas', value: [50, 80] },
  { label: '💎 Underground', description: 'Joyas ocultas', value: [0, 50] },
];

export default function PopularityWidget({ selectedItems, onSelect }) {

  function handleSelect(value) {
    if (JSON.stringify(selectedItems) === JSON.stringify(value)) {
      onSelect([0, 100]);
    } else {
      onSelect(value);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">📊 Popularidad</h2>
      <p className="text-gray-400 text-xs mb-3">¿Qué tipo de canciones prefieres?</p>

      <div className="flex flex-col gap-2">
        {POPULARITY_OPTIONS.map(option => (
          <button
            key={option.label}
            onClick={() => handleSelect(option.value)}
            className={`text-left px-4 py-3 rounded-lg transition-colors ${
              JSON.stringify(selectedItems) === JSON.stringify(option.value)
                ? 'bg-green-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <p className="font-medium text-sm">{option.label}</p>
            <p className="text-xs opacity-70">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}