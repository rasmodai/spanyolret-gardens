/* Noindex by default, so that an accidental deployment (a preview, a new
 * project) is never indexed. Only the exact value ALLOW_INDEXING=true opens the
 * site. next.config.js reads the same variable for the X-Robots-Tag header, and
 * app/robots.ts and app/sitemap.ts follow it. Read at build time: changing it
 * needs a redeploy. */
export function isIndexingAllowed(flag: string | undefined): boolean {
    return flag === 'true';
}

export function robotsFor(flag: string | undefined) {
    return isIndexingAllowed(flag) ? { index: true, follow: true } : { index: false, follow: false };
}

export const allowIndexing = isIndexingAllowed(process.env.ALLOW_INDEXING);

export const robots = robotsFor(process.env.ALLOW_INDEXING);
