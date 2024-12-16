# California Plumbing Directory

A Next.js-based directory website for finding plumbing services across California cities.

## Features

- Search for plumbing services by city and service type
- SEO-optimized pages with meta titles and descriptions
- Responsive design with mobile-first approach
- Cached search results using MongoDB
- Sitemap generation for better SEO
- Breadcrumb navigation
- Pagination for search results

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with the following variables:
```
MONGODB_URI=your_mongodb_uri
VALUESERP_API_KEY=your_valueserp_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000
SITE_URL=your_production_url
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start the production server:
```bash
npm start
```

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB
- ValueSerp API
- Headless UI
- Hero Icons

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and API clients
- `/src/types` - TypeScript type definitions
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
