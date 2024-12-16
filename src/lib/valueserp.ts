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
    // Check MongoDB first
    if (process.env.MONGODB_URI) {
      try {
        const client = await clientPromise;
        const db = client.db('plumbing-directory');
        const collection = db.collection('search-results');

        // Create compound index for faster lookups
        await collection.createIndex({ keyword: 1, city: 1 });

        // Check if we already have results for this keyword + city
        const cachedResult = await collection.findOne({
          keyword: keyword.toLowerCase(),
          city: city.toLowerCase(),
        });

        if (cachedResult) {
          console.log('Found cached results for:', keyword, city);
          return cachedResult.results;
        }

        // If no cached results, fetch from API
        console.log('No cached results, fetching from API for:', keyword, city);
        const response = await axios.get('https://api.valueserp.com/search', { params });
        const places = response.data.places_results || [];
        
        const results: SearchResult[] = places.map((place: any) => ({
          title: place.title || '',
          address: place.address || '',
          phone: place.phone,
          rating: place.rating || 0,
          reviews: place.reviews || 0,
          website: place.website,
          type: place.type,
          hours: place.hours,
          description: place.description
        }));

        // Store the results permanently in MongoDB
        await collection.updateOne(
          { 
            keyword: keyword.toLowerCase(), 
            city: city.toLowerCase() 
          },
          {
            $set: {
              results,
              firstFetched: new Date(), // When the data was first fetched
              lastAccessed: new Date(), // Track when the data was last accessed
            }
          },
          { upsert: true }
        );

        // Update lastAccessed timestamp
        await collection.updateOne(
          { 
            keyword: keyword.toLowerCase(), 
            city: city.toLowerCase() 
          },
          {
            $set: {
              lastAccessed: new Date()
            }
          }
        );

        return results;
      } catch (error) {
        console.error('MongoDB error:', error);
        throw error; // Throw error to be handled by outer try-catch
      }
    }

    // If MongoDB is not configured, just fetch from API
    console.log('MongoDB not configured, fetching from API for:', keyword, city);
    const response = await axios.get('https://api.valueserp.com/search', { params });
    const places = response.data.places_results || [];
    
    return places.map((place: any) => ({
      title: place.title || '',
      address: place.address || '',
      phone: place.phone,
      rating: place.rating || 0,
      reviews: place.reviews || 0,
      website: place.website,
      type: place.type,
      hours: place.hours,
      description: place.description
    }));

  } catch (error) {
    console.error('Error in searchValueSerp:', error);
    return [];
  }
});
