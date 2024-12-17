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
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const filteredServices = services.filter(s => 
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service && location) {
      const serviceSlug = service.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const locationSlug = location.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      router.push(`/${serviceSlug}/${locationSlug}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.service-select')) {
        setIsServiceOpen(false);
      }
      if (!target.closest('.location-select')) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 border border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Service Dropdown */}
          <div className="flex-1 relative service-select group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsServiceOpen(!isServiceOpen)}
                className="block w-full pl-12 pr-10 py-4 text-left text-base text-gray-900 bg-gray-50/50 backdrop-blur-sm border border-gray-200/50 rounded-xl 
                          shadow-[0_2px_10px_rgba(0,0,0,0.06)] 
                          hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                          focus:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] 
                          transition-all duration-200 ease-out
                          group-hover:scale-[1.02] group-hover:-translate-y-0.5"
              >
                <span className="block truncate">{service || "What service do you need?"}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isServiceOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              {isServiceOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                              max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                  <div className="p-2">
                    <input
                      type="text"
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      placeholder="Search services..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="py-1">
                    {filteredServices.map((s) => (
                      <div
                        key={s}
                        className={`px-4 py-3 cursor-pointer transition-all duration-200
                                ${service === s 
                                  ? 'bg-blue-50/80 text-blue-600 font-medium' 
                                  : 'text-gray-900 hover:bg-gray-50/80'}`}
                        onClick={() => {
                          setService(s);
                          setIsServiceOpen(false);
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Location Dropdown */}
          <div className="flex-1 relative location-select group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="block w-full pl-12 pr-10 py-4 text-left text-base text-gray-900 bg-gray-50/50 backdrop-blur-sm border border-gray-200/50 rounded-xl 
                          shadow-[0_2px_10px_rgba(0,0,0,0.06)] 
                          hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                          focus:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] 
                          transition-all duration-200 ease-out
                          group-hover:scale-[1.02] group-hover:-translate-y-0.5"
              >
                <span className="block truncate">{location || "Where do you need it?"}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              {isLocationOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                              max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                  <div className="p-2">
                    <input
                      type="text"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      placeholder="Search cities..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="py-1">
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className={`px-4 py-3 cursor-pointer transition-all duration-200
                                ${location === city 
                                  ? 'bg-blue-50/80 text-blue-600 font-medium' 
                                  : 'text-gray-900 hover:bg-gray-50/80'}`}
                        onClick={() => {
                          setLocation(city);
                          setIsLocationOpen(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium
                     shadow-[0_4px_14px_rgba(59,130,246,0.4)] 
                     hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)]
                     hover:scale-[1.02] hover:-translate-y-0.5
                     transition-all duration-200 ease-out"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
