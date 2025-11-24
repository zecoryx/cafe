import { useState } from 'react';
import { tables as allTables } from '../shared/data/api';

function TableSelectModal({ onClose, onSelect, currentTableId }) {
  const [searchQuery, setSearchQuery] = useState('');

  const availableTables = allTables.filter(table => 
    table.status === 'available' && 
    `Table ${table.number}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-2xl p-6 border border-white/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Stolni Tanlang</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Stollarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-6 gap-3 max-h-96 overflow-y-auto">
          {availableTables.map((table) => (
            <button
              key={table.id}
              onClick={() => {
                onSelect(table.number);
                onClose();
              }}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg backdrop-blur-sm ${
                currentTableId === table.number
                  ? 'border-blue-500 bg-blue-50/90'
                  : 'border-gray-200/50 bg-white/90 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <p className="font-bold text-gray-800">Stol {table.number}</p>
                <p className="text-xs text-gray-600 mt-1">{table.capacity} kishi</p>
              </div>
            </button>
          ))}
        </div>

        {availableTables.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Bo'sh stollar topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableSelectModal;

