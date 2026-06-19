'use client';

const DECADES = [
  { label: '1950s', value: '1950' },
  { label: '1960s', value: '1960' },
  { label: '1970s', value: '1970' },
  { label: '1980s', value: '1980' },
  { label: '1990s', value: '1990' },
  { label: '2000s', value: '2000' },
  { label: '2010s', value: '2010' },
  { label: '2020s', value: '2020' },
];

export default function DecadeWidget({ selectedItems, onSelect }) {

  function handleToggle(value) {
    if (selectedItems.includes(value)) {
      onSelect(selectedItems.filter(d => d !== value));
    } else {
      onSelect([...selectedItems, value]);
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">📅 Décadas</h2>
      <p className="text-gray-400 text-xs mb-3">Selecciona una o varias épocas</p>

      <div className="grid grid-cols-4 gap-2">
        {DECADES.map(decade => (
          <button
            key={decade.value}
            onClick={() => handleToggle(decade.value)}
            className={`text-sm py-2 rounded-lg font-medium transition-colors ${
              selectedItems.includes(decade.value)
                ? 'bg-green-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {decade.label}
          </button>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <p className="text-green-400 text-xs mt-3">
          Seleccionadas: {selectedItems.map(d => d + 's').join(', ')}
        </p>
      )}
    </div>
  );
}