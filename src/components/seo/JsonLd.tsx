import { BUSINESS_INFO } from "@/lib/constants";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BUSINESS_INFO.url}/#person`,
    name: BUSINESS_INFO.name,
    jobTitle: "Coach Professionnelle",
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.url,
    knowsAbout: [
      "Coaching professionnel",
      "Leadership",
      "Transition de carriere",
      "Performance",
    ],
    sameAs: [
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.linkedin,
    ].filter(Boolean),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS_INFO.url}/#website`,
    url: BUSINESS_INFO.url,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    inLanguage: "fr-FR",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Coaching Professionnel",
    description: BUSINESS_INFO.description,
    provider: {
      "@id": `${BUSINESS_INFO.url}/#person`,
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
