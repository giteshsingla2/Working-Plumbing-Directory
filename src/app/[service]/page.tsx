import { getCaliforniaCities } from '@/lib/cities';
import { getKeywords } from '@/lib/keywords';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPinIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/components/Breadcrumbs';
import { notFound } from 'next/navigation';

interface ServiceCitiesPageProps {
  params: {
    service: string;
  };
}

// Validate if the service exists in keywords.txt
async function isValidService(service: string): Promise<boolean> {
  const validServices = await getKeywords();
  const normalizedService = service.replace(/-/g, " ").toLowerCase();
  return validServices.some(validService => 
    validService.toLowerCase() === normalizedService
  );
}

export async function generateMetadata({ params }: ServiceCitiesPageProps): Promise<Metadata> {
  // Check if service is valid before generating metadata
  if (!await isValidService(params.service)) {
    return {
      title: "Service Not Found",
      description: "The requested plumbing service could not be found.",
    };
  }

  const service = params.service.split("-").map(s => 
    s.charAt(0).toUpperCase() + s.slice(1)
  ).join(" ");

  return {
    title: `${service} - Available Cities in California`,
    description: `Find reliable ${service.toLowerCase()} services across cities in California. Expert plumbers available 24/7.`,
  };
}

export default async function ServiceCitiesPage({ params }: ServiceCitiesPageProps) {
  // Validate service before rendering the page
  if (!await isValidService(params.service)) {
    notFound();
  }

  const cities = await getCaliforniaCities();
  const service = params.service.split("-").map(s => 
    s.charAt(0).toUpperCase() + s.slice(1)
  ).join(" ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service, href: "#" },
            ]}
            className="text-blue-100 mb-8"
          />
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {service} Services
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Find reliable {service.toLowerCase()} services in cities across California. 
            Our network of licensed plumbers provides 24/7 service with upfront pricing.
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Available Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/${params.service}/${city.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {city}
                  </h3>
                </div>
                <p className="mt-2 text-gray-500">
                  Professional {service.toLowerCase()} services
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium flex items-center gap-1">
                  View details <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
