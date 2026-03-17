export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Riadah Services",
    "description": "Leading UAE business professionals offering company formation, PRO services, visa processing, and business setup in Dubai, Abu Dhabi & Al Ain.",
    "url": "https://riadahservices.com",
    "telephone": "+971-3-xxx-xxxx",
    "email": "info@riadahservices.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Al Ain",
      "addressRegion": "Abu Dhabi",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.2075",
      "longitude": "55.7447"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "priceRange": "$",
    "image": "https://riadahservices.com/Images/logo.png-removebg-preview.png",
    "areaServed": {
      "@type": "Place",
      "name": "UAE, Dubai, Abu Dhabi, Al Ain"
    },
    "serviceType": [
      "Business Setup",
      "PRO Services",
      "Visa Processing",
      "Trade License",
      "Company Formation",
      "Document Clearing",
      "Typing Services"
    ],
    "sameAs": [
      "https://www.facebook.com/riadahservices",
      "https://www.instagram.com/riadahservices",
      "https://www.linkedin.com/company/riadahservices"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
