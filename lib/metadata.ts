import type { Metadata } from 'next';
import { getCopy } from './copy';
import type { Locale } from './format';
import { robots } from './indexing';
import { privacyCopy } from './privacy-copy';
import { projectConfig } from './project-config';

/* Public address of the site, without trailing slash. Without it (local work, a
 * preview) the relative URLs below stay relative and Next warns at build. */
export function metadataBaseFor(siteUrl: string | undefined): URL | undefined {
    return siteUrl ? new URL(siteUrl) : undefined;
}

/** The root layout: the site address and the indexing rule every page inherits. */
export function rootMetadata(siteUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): Metadata {
    const metadataBase = metadataBaseFor(siteUrl);
    return { ...(metadataBase ? { metadataBase } : {}), robots };
}

const HOME_PATH = { en: '/', hu: '/hu' } as const;

/* The card image (app/opengraph-image.jpg, a copy as app/twitter-image.jpg for
 * Twitter). Listed explicitly because a page that sets its own `openGraph` does
 * not inherit the image of a parent segment: without it /hu would have none.
 * metadataBase makes the path absolute. */
const CARD_IMAGE = { url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Spanyolrét Gardens' };
const TWITTER_IMAGE = { url: '/twitter-image.jpg', width: 1200, height: 630, alt: 'Spanyolrét Gardens' };

/** The home page in one language: title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata(locale: Locale): Metadata {
    const { meta } = getCopy(locale);
    const path = HOME_PATH[locale];
    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: path,
            languages: { en: HOME_PATH.en, hu: HOME_PATH.hu, 'x-default': HOME_PATH.en },
        },
        openGraph: {
            title: meta.ogTitle,
            description: meta.ogDescription,
            type: 'website',
            locale: meta.ogLocale,
            url: path,
            siteName: 'Spanyolrét Gardens',
            images: [CARD_IMAGE],
        },
        twitter: { card: 'summary_large_image', title: meta.ogTitle, description: meta.ogDescription, images: [TWITTER_IMAGE] },
    };
}

/** The privacy page: indexable with the rest of the site, canonical and hreflang between the two languages. */
export function privacyMetadata(locale: Locale): Metadata {
    const path = projectConfig.privacyPath[locale];
    const { en, hu } = projectConfig.privacyPath;
    return {
        title: privacyCopy[locale].metaTitle,
        robots,
        alternates: { canonical: path, languages: { en, hu, 'x-default': en } },
    };
}
