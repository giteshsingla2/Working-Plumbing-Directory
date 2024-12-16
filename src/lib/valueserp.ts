import axios from 'axios';
import { SearchResult } from '../types';
import clientPromise from './mongodb';

export async function searchValueSerp(keyword: string, city: string): Promise<SearchResult[]> {
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
    // Check cache first
    const client = await clientPromise;
    const db = client.db('plumbing-directory');
    const collection = db.collection('search-results');

    const cachedResult = await collection.findOne({
      keyword,
      city,
      timestamp: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // 7 days cache
    });

    if (cachedResult) {
      return cachedResult.results;
    }

    // If not in cache, fetch from API
    const response = await axios.get('https://api.valueserp.com/search', { params });
    const results = response.data.places.map((place: any, index: number) => ({
      title: place.title,
      link: place.link,
      snippet: place.snippet || place.description,
      position: index + 1
    }));

    // Cache the results
    await collection.insertOne({
      keyword,
      city,
      results,
      timestamp: new Date()
    });

    return results;
  } catch (error) {
    console.error('ValueSerp API Error:', error);
    return [];
  }
}
