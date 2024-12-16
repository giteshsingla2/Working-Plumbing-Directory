import SearchForm from '@/components/SearchForm';
import { WrenchScrewdriverIcon, MapPinIcon, ShieldCheckIcon, ClockIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Find Top Plumbing Services in California
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Connect with <span className="text-blue-600 font-semibold">reliable, licensed plumbers</span> in your area. 
              Get instant quotes and book appointments with trusted professionals.
            </p>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Trusted Plumbing Directory
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: 'Licensed Professionals',
                  description: 'All plumbers in our directory are licensed and insured, ensuring quality service.',
                  icon: WrenchScrewdriverIcon,
                },
                {
                  title: 'Local Coverage',
                  description: 'Find plumbers in your area with our extensive California coverage.',
                  icon: MapPinIcon,
                },
                {
                  title: 'Verified Reviews',
                  description: 'Read authentic reviews from real customers to make informed decisions.',
                  icon: ShieldCheckIcon,
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Popular Cities
            </h2>
            <p className="text-gray-600 text-lg">
              Find Top-Rated Plumbing Services In These Major California Cities
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Los Angeles',
              'San Diego',
              'San Jose',
              'San Francisco',
              'Fresno',
              'Sacramento',
            ].map((city) => (
              <Link
                key={city}
                href={`/city/${city.toLowerCase().replace(' ', '-')}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-blue-600 to-blue-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{city}</h3>
                  <p className="text-gray-200 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View Local Plumbers →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Popular Plumbing Services
            </h2>
            <p className="text-gray-600 text-lg">Expert Solutions For All Your Plumbing Needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Emergency Plumbing',
                description: 'Get 24/7 emergency plumbing services for all your urgent needs.',
                icon: WrenchScrewdriverIcon,
                availability: '24/7',
                link: '/emergency-plumbing',
              },
              {
                title: 'Drain Cleaning',
                description: 'Expert drain cleaning services to clear clogs and blockages.',
                icon: MapPinIcon,
                availability: 'Mon-Sun, 8am-5pm',
                link: '/drain-cleaning',
              },
              {
                title: 'Water Heater Installation',
                description: 'Professional water heater installation services for all types of heaters.',
                icon: ShieldCheckIcon,
                availability: 'Mon-Sun, 8am-5pm',
                link: '/water-heater-installation',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{service.availability}</span>
                  </div>
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowLongRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm"
            >
              View All Services
              <ArrowLongRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
