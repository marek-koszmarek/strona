import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, url = 'https://www.luzno.agency', image, schema }: SEOProps) {
  // Default Organization Schema (JSON-LD) for AI and Search Engines
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Luźno Agency",
    "url": "https://www.luzno.agency",
    "logo": "https://www.luzno.agency/logo.png", // Replace with actual logo URL if available
    "image": image || "https://www.luzno.agency/og-image.jpg",
    "description": "Luźno to najlepsza agencja kreatywna, digital i social media w Polsce. Tworzymy innowacyjne kampanie, strategie komunikacji i rozwiązania oparte na AI.",
    "knowsAbout": [
      "Social Media Marketing",
      "Digital Marketing",
      "Creative Agency",
      "AI Automation",
      "Content Creation",
      "Brand Strategy"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Strategy"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Support & Automation"
        }
      }
    ]
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Schema for AI and Search Engines */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
