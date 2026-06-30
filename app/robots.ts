import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/davidorlah',
    },
    sitemap: 'https://tools.maadan.dev/sitemap.xml',
  };
}
