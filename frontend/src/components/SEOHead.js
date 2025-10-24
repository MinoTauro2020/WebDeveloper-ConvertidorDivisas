import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = 'Conversor de Divisas Online Gratis 2025 - EUR USD MXN ARS | Convertidor de Monedas',
  description = 'Conversor de divisas online gratis 2025. Convierte EUR, USD, MXN, ARS y más de 15 monedas con tasas de cambio en tiempo real. Calculadora rápida y precisa.',
  keywords = 'conversor divisas, cambio divisas, euro dolar, dolar peso mexicano, calculadora divisas, tasas de cambio, convertidor monedas',
  url = 'https://convertidordivisas.es',
  image = 'https://convertidordivisas.es/og-image.png'
}) => {
  const siteName = 'ConvertidorDivisas.es';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Conversor de Divisas",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "15234"
          },
          "description": description,
          "url": url,
          "provider": {
            "@type": "Organization",
            "name": siteName,
            "url": "https://convertidordivisas.es"
          }
        })}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": "https://convertidordivisas.es"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Conversor de Divisas",
              "item": url
            }
          ]
        })}
      </script>

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": "https://convertidordivisas.es",
          "logo": "https://convertidordivisas.es/logo.png",
          "sameAs": [
            "https://twitter.com/convertidordivisas",
            "https://facebook.com/convertidordivisas"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Spanish", "English"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;