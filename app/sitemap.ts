import type { MetadataRoute } from 'next';
import { allowIndexing } from '@/lib/indexing';

/* The two home pages, each pointing at the other (hreflang). Empty while
 * indexing is closed (lib/indexing.ts) or without a site address. The privacy
 * pages are left out on purpose: they are public, not something to rank. */
export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!allowIndexing || !siteUrl) return [];
    const languages = { en: `${siteUrl}/`, hu: `${siteUrl}/hu`, 'x-default': `${siteUrl}/` };
    return [
        { url: `${siteUrl}/`, alternates: { languages } },
        { url: `${siteUrl}/hu`, alternates: { languages } },
    ];
}
