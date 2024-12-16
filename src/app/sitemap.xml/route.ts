import { generateSitemap } from '@/lib/sitemap';

export async function GET() {
  try {
    // Generate the sitemap
    const sitemap = await generateSitemap();

    // Return the sitemap with appropriate headers
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
