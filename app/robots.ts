import type { MetadataRoute } from 'next';
import { allowIndexing } from '@/lib/indexing';

/* Follows the ALLOW_INDEXING guard (lib/indexing.ts). Closed: crawling stays
 * open on purpose, so that a crawler reads the noindex header and tag and drops
 * the page (a Disallow would hide them); no sitemap. Open: the sitemap, and no
 * crawling of the API. The thank-you pages are noindex in their own metadata. */
export default function robots(): MetadataRoute.Robots {
    if (!allowIndexing) return { rules: { userAgent: '*', allow: '/' } };
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    return {
        rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
        ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
    };
}
