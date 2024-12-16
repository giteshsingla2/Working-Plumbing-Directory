interface MapProps {
  city: string;
}

export default function Map({ city }: MapProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(city)},California,US&output=embed`;
  
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
