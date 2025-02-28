'use client';

import { useState } from 'react';

interface ServiceFilterProps {
  onFilterChange: (category: string | null) => void;
  activeFilter: string | null;
}

export default function ServiceFilter({ onFilterChange, activeFilter }: ServiceFilterProps) {
  const categories = [
    { id: null, name: 'Tous' },
    { id: 'AMEUBLEMENT', name: 'Ameublement' },
    { id: 'AUTOMOBILE', name: 'Automobile' },
    { id: 'PROFESSIONNEL', name: 'Professionnel' },
    { id: 'SPECIAL', name: 'Spécial' },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id || 'all'}
            onClick={() => onFilterChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeFilter === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
