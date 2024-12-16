import axios from 'axios';
import { SearchResult } from '../types';
import clientPromise from './mongodb';
import { cache } from 'react';

export const searchValueSerp = cache(async function(keyword: string, city: string): Promise<SearchResult[]> {
  const params = {
    api_key: process.env.VALUESERP_API_KEY,
    search_type: "places",
    q: `${keyword} ${city}`,
    location: `${city},California,United States`,
    google_domain: "google.com",
    gl: "us",
    hl: "en"
  };

  try {
    // Check cache first if MongoDB is configured
    if (process.env.MONGODB_URI) {
      try {
        const client = await clientPromise;
        const db = client.db('plumbing-directory');
        const collection = db.collection('search-results');

        // Create indexes if they don't exist
        await collection.createIndex({ keyword: 1, city: 1 });
        await collection.createIndex({ timestamp: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 }); // 7 days TTL

        const cachedResult = await collection.findOne({
          keyword: keyword.toLowerCase(),
          city: city.toLowerCase(),
          timestamp: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // 7 days cache
        });

        if (cachedResult) {
          console.log('Cache hit for:', keyword, city);
          return cachedResult.results;
        }
      } catch (error) {
        console.error('MongoDB cache error:', error);
        // Continue with API call if cache fails
      }
    }

    // If not in cache or cache failed, fetch from API
    console.log('Cache miss, fetching from API for:', keyword, city);
    const response = await axios.get('https://api.valueserp.com/search', { params });
    const places = response.data.places_results || [];
    
    const results: SearchResult[] = places.map((place: any) => ({
      title: place.title || '',
      address: place.address || '',
      phone: place.phone,
      rating: place.rating,
      reviews: place.reviews,
      website: place.website,
      type: place.type,
      hours: place.hours,
      description: place.description
    }));

    // Cache the results if MongoDB is configured
    if (process.env.MONGODB_URI) {
      try {
        const client = await clientPromise;
        const db = client.db('plumbing-directory');
        const collection = db.collection('search-results');

        await collection.updateOne(
          { 
            keyword: keyword.toLowerCase(), 
            city: city.toLowerCase() 
          },
          {
            $set: {
              results,
              timestamp: new Date()
            }
          },
          { upsert: true }
        );
      } catch (error) {
        console.error('MongoDB cache update error:', error);
      }
    }

    return results;
  } catch (error) {
    console.error('ValueSerp API Error:', error);
    return [];
  }
});
