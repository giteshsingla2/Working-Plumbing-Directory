import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchForm from '@/components/SearchForm';
import { searchValueSerp } from '@/lib/valueserp';

interface Props {
  params: {
    keyword: string;
    city: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword, city } = params;
  const decodedKeyword = decodeURIComponent(keyword);
  const decodedCity = decodeURIComponent(city);

  return {
    title: `Top 10 ${decodedKeyword} in ${decodedCity}, California`,
    description: `Find the best ${decodedKeyword.toLowerCase()} services in ${decodedCity}, California. Compare trusted professionals and read reviews.`,
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { keyword, city } = params;
  const page = parseInt(searchParams.page || '1');
  const decodedKeyword = decodeURIComponent(keyword);
  const decodedCity = decodeURIComponent(city);

  const results = await searchValueSerp(keyword, city);
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedResults = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Search', href: '/' },
            { label: decodedKeyword },
            { label: decodedCity },
          ]}
        />

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Top {paginatedResults.length} {decodedKeyword} in {decodedCity}, California
          </h1>

          <div className="mb-8">
            <SearchForm />
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {paginatedResults.map((result: any, index: number) => (
                <li key={result.link}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-blue-600">
                        {startIndex + index + 1}. {result.title}
                      </h2>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{result.snippet}</p>
                    </div>
                    <div className="mt-2">
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <a
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pageNum === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
