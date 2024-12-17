interface ZipCodesMapProps {
  zipCodes: string[];
  city: string;
}

export default function ZipCodesMap({ zipCodes, city }: ZipCodesMapProps) {
  // Remove duplicate zip codes
  const uniqueZipCodes = Array.from(new Set(zipCodes));

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Service Coverage Map
          </h2>
          <p className="text-lg text-gray-600">
            Explore our service areas across {uniqueZipCodes.length} ZIP codes in {city}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uniqueZipCodes.map((zip) => (
            <div 
              key={zip}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/50 
                         backdrop-blur-lg transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] 
                         hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    ZIP Code {zip}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    {city}
                  </span>
                </div>
              </div>
              
              <div className="aspect-[4/3] w-full relative">
                <iframe 
                  src={`https://www.google.com/maps?q=${encodeURIComponent(city)}+${encodeURIComponent(zip)}&output=embed`}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  aria-hidden="false"
                  tabIndex={0}
                  title={`Map of ${city} ZIP code ${zip}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
