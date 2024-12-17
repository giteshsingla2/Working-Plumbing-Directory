import citiesData from '../../cities.json';

export interface CityData {
  name: string;
  state?: string;
  zipCodes: string[];
  neighborhoods: (string | null)[];
  population?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  slug?: string;
}

type CitiesData = {
  [key: string]: CityData;
};

export function getCityData(citySlug: string): CityData | null {
  const normalizedSlug = citySlug.toLowerCase().replace(/ /g, '-');
  const cities = citiesData as CitiesData;
  return cities[normalizedSlug] || null;
}
