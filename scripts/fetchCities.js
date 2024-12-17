const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');

async function fetchCaliforniaCities() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('states_db');
    const collection = database.collection('states');

    // List all collections to verify we're looking in the right place
    const collections = await database.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // First, let's see what's in the collection
    const sampleDocs = await collection.find({}).limit(1).toArray();
    console.log('Sample document structure:', JSON.stringify(sampleDocs, null, 2));

    // Find the document that contains California data
    const stateData = await collection.findOne({ 'ca.state_name': 'California' });

    if (!stateData || !stateData.ca || !stateData.ca.city) {
      throw new Error('California data not found');
    }

    // Transform the data into the required format
    const citiesData = {};
    
    stateData.ca.city.forEach(city => {
      // Create a slug from the city name
      const slug = city.city_name.toLowerCase().replace(/\s+/g, '-');
      
      citiesData[slug] = {
        name: city.city_name,
        zipCodes: city.city_zip_code || [],
        neighborhoods: city.neighbourhood || []
      };
    });

    // Write to cities.json
    const outputPath = path.join(__dirname, '..', 'cities.json');
    await fs.writeFile(outputPath, JSON.stringify(citiesData, null, 2));
    console.log('Successfully created cities.json');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Check for MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error('Please provide MONGODB_URI environment variable');
  process.exit(1);
}

fetchCaliforniaCities();
