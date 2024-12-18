import fs from 'fs';
import path from 'path';

// Import city and service data
import cityNames from '../../city-names.json';
import { readFileSync } from 'fs';

// Read keywords.txt for services
const keywordsPath = path.join(process.cwd(), 'keywords.txt');
const keywords = readFileSync(keywordsPath, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(keyword => keyword.trim());

// Base URL of your website
const BASE_URL = 'https://findplumbercalifornia.com'; // Update this with your actual domain

// Function to convert string to URL-friendly slug
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Function to generate sitemap XML
export async function generateSitemap() {
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
  ];

  // Generate URLs for static pages
  const staticUrls = staticPages.map(page => ({
    loc: `${BASE_URL}${page}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: page === '' ? '1.0' : '0.8',
  }));

  // Generate URLs for dynamic search pages
  const dynamicUrls = [];

  // Add service-city combination pages
  for (const service of keywords) {
    for (const city of cityNames) {
      dynamicUrls.push({
        loc: `${BASE_URL}/search/${toSlug(service)}/${toSlug(city)}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.6',
      });
    }
  }

  // Combine all URLs
  const allUrls = [...staticUrls, ...dynamicUrls];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}
