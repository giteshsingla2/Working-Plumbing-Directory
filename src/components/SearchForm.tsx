'use client';

import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  cities: string[];
  services: string[];
}

export default function SearchForm({ cities, services }: SearchFormProps) {
  const router = useRouter();
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service && location) {
      // Convert to URL-friendly format
      const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
      const locationSlug = location.toLowerCase().replace(/\s+/g, '-');
      router.push(`/${serviceSlug}/${locationSlug}`);
    }
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
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
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
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
