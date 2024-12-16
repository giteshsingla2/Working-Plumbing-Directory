'use client';

import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SearchForm() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { service, location });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
            </div>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">What service do you need?</option>
              <option value="emergency">Emergency Plumbing</option>
              <option value="repair">Pipe Repair</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-blue-600" />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Where do you need it?</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="san-diego">San Diego</option>
              <option value="san-francisco">San Francisco</option>
              <option value="san-jose">San Jose</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!service || !location}
            className="md:w-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            Find Plumbers
          </button>
        </div>
      </div>
    </form>
  );
}
