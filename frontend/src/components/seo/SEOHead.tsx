import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  keywords: string[]
  language?: 'zh' | 'en'
}

const SEOHead = ({ title, description, keywords, language = 'zh' }: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="language" content={language} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={window.location.href} />
      {/* Add hreflang tags for language variants */}
      <link rel="alternate" hrefLang="zh" href={window.location.href} />
      <link rel="alternate" hrefLang="en" href={window.location.href} />
      {/* Add structured data for better SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": title,
          "description": description,
          "url": window.location.href,
          "inLanguage": ["zh", "en"]
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead
