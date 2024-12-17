import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { searchValueSerp } from "@/lib/valueserp";
import Breadcrumbs from "@/components/Breadcrumbs";
import Map from "@/components/Map";
import ZipCodesMap from "@/components/ZipCodesMap";
import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, PhoneIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { getCaliforniaCities } from "@/lib/cities";
import { getKeywords } from "@/lib/keywords";
import { getRandomNumber } from "@/lib/numbers";
import { getCityData } from "@/lib/cityData";

interface BusinessResult {
  title: string;
  address: string;
  phone?: string;
  rating?: number;
  reviews?: number;
  website?: string;
  type?: string;
  hours?: string;
  description?: string;
}

// Validate if the service and city are valid
async function isValidRoute(service: string, city: string) {
  const [validCities, validServices] = await Promise.all([
    getCaliforniaCities(),
    getKeywords()
  ]);

  const normalizedCity = city.replace(/-/g, " ").toLowerCase();
  const normalizedService = service.replace(/-/g, " ").toLowerCase();
  
  const isValidService = validServices.some(validService => 
    validService.toLowerCase() === normalizedService
  );
  
  const isValidCity = validCities.some(validCity => 
    validCity.toLowerCase() === normalizedCity
  );

  return isValidService && isValidCity;
}

interface PageParams {
  service: string;
  city: string;
}

interface PageProps {
  params: PageParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const service = capitalizeWords(params.service.replace(/-/g, " "));
  const city = capitalizeWords(params.city.replace(/-/g, " "));

  return {
    title: `Best ${service} in ${city}, CA`,
    description: `Find the best ${service} services in ${city}. Professional, licensed, and experienced ${service} experts serving the ${city} area.`
  };
}

export default async function Page({ params }: PageProps) {
  // Check if the route is valid
  if (!await isValidRoute(params.service, params.city)) {
    notFound();
  }

  // Capitalize first letter of each word in service and city
  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const service = capitalizeWords(params.service.replace(/-/g, " "));
  const city = capitalizeWords(params.city.replace(/-/g, " "));
  
  const results = await searchValueSerp(service, city);
  const cityData = getCityData(params.city);

  // Sort places by rating (highest first)
  const sortedPlaces = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: city, href: `/${params.service}/${params.city}` },
  ];

  // Get current month and year for the featured badge
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">
          Top {service} Services in {city}
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Find the best professional {service.toLowerCase()} services in {city}. Our directory features licensed, experienced, and highly-rated providers.
        </p>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: CheckBadgeIcon, title: "Licensed", desc: "Verified Professionals", color: "text-emerald-600" },
            { icon: StarIcon, title: "Top Rated", desc: "Excellence In Service", color: "text-amber-500" },
            { icon: PhoneIcon, title: "24/7 Available", desc: "Round-The-Clock Support", color: "text-blue-600" },
            { icon: MapPinIcon, title: "Local Experts", desc: "In Your Neighborhood", color: "text-indigo-600" },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <item.icon className={`h-10 w-10 mb-4 ${item.color}`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Service Providers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPlaces.slice(0, 10).map((place, index) => {
            const getRankBadge = () => {
              if (index === 0) return { color: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400", text: "Gold Tier" };
              if (index === 1) return { color: "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200", text: "Silver Tier" };
              if (index === 2) return { color: "bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700", text: "Bronze Tier" };
              return null;
            };

            const badge = getRankBadge();
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative border border-gray-100 h-full
                  ${index === 0 ? "ring-2 ring-amber-400 ring-offset-2 md:col-span-2 lg:col-span-1" : ""}
                `}
              >
                <div className="pt-16 px-6 pb-6"> 
                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
                        Featured {month} {year}
                      </div>
                    </div>
                  )}

                  {/* Rank Badge */}
                  {badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`${badge.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap`}>
                        {badge.text}
                      </div>
                    </div>
                  )}

                  {/* Business Name and Type */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {place.title}
                    </h2>
                    {place.type && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                        {place.type}
                      </span>
                    )}
                  </div>

                  {/* Rating Section */}
                  {place.rating && (
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(place.rating ?? 0)
                                  ? "text-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {place.rating.toFixed(1)}
                        </span>
                      </div>
                      {place.reviews && (
                        <p className="text-sm text-gray-500">
                          Based on {place.reviews} reviews
                        </p>
                      )}
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-3 mb-4">
                    {/* Address */}
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="ml-2 text-sm text-gray-600 line-clamp-2">{place.address}</span>
                    </div>

                    {/* Call Now Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <a
                          href={`tel:${getRandomNumber()}`}
                          className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          <PhoneIcon className="h-5 w-5 mr-2" />
                          Call Now
                        </a>
                      </div>
                    </div>

                    {/* Website */}
                    {place.website && (
                      <div className="flex items-center">
                        <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                        <a 
                          href={place.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ml-2 text-sm text-blue-600 hover:text-blue-800 truncate"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Hours */}
                  {place.hours && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-3">{place.hours}</p>
                    </div>
                  )}

                  {/* Description */}
                  {place.description && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">About</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{place.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Area Coverage */}
        {cityData && (
          <div className="mb-12 mt-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-10 w-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Service Coverage in {city}</h2>
            </div>
            
            {/* Zip Codes Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Zip Codes We Serve</h3>
                  <p className="text-gray-600">Providing reliable service across these postal areas</p>
                </div>
                <div className="hidden md:block">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {cityData.zipCodes.length} Service Areas
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {cityData.zipCodes.map((zipCode) => (
                  <div 
                    key={zipCode} 
                    className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="font-semibold text-gray-700">{zipCode}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <ZipCodesMap zipCodes={cityData.zipCodes} city={city} />
              </div>
            </div>

            {/* Neighborhoods Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Neighborhoods Where These Company Provide Services</h3>
                  <p className="text-gray-600">Complete coverage across {city} communities</p>
                </div>
                <div className="hidden md:block">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    {cityData.neighborhoods.length} Areas
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cityData.neighborhoods.map((neighborhood, index) => (
                  <div 
                    key={neighborhood} 
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MapPinIcon className="h-4 w-4 text-emerald-600" />
                      </div>
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{neighborhood}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map Component */}
        <Map city={city} />
      </div>
    </main>
  );
}
