import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    // This is just an example, we need to replace this with the actual sitemap URL
    sitemap: 'https://acme.com/sitemap.xml',
  }
}