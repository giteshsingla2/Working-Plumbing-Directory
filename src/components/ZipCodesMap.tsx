interface ZipCodesMapProps {
  zipCodes: string[];
  city: string;
}

export default function ZipCodesMap({ zipCodes, city }: ZipCodesMapProps) {
  // Create a query that includes all zip codes
  const zipCodesQuery = zipCodes.join('|');
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(city)}+${encodeURIComponent(zipCodesQuery)}&output=embed`;
  
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg my-6">
      <iframe 
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
      />
    </div>
  );
}
