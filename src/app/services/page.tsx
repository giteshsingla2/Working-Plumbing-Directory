import { getKeywords } from '@/lib/keywords';
import Link from 'next/link';
import { Metadata } from 'next';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Services | Professional Plumbing Services',
  description: 'Explore our comprehensive range of professional plumbing services. From emergency repairs to installations, we have got you covered.',
};

export default async function ServicesPage() {
  const services = await getKeywords();

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
            ]}
            className="text-blue-100 mb-8"
          />
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Explore our comprehensive range of professional plumbing services. 
            From emergency repairs to installations, we have got you covered.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service}
              href={`/${service.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {service}
                  </h3>
                </div>
                <p className="mt-2 text-gray-500">
                  Professional {service.toLowerCase()} services across California
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium flex items-center gap-1">
                  View service locations <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
