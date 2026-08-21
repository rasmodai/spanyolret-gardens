import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Spanyolrét Gardens | Sorházak 102–317 m² saját kerttel | Budapest XI.',
    // Ár nélkül, mint az angol változatban: az ártól elválaszthatatlan a
    // 2026. szeptember 30-i foglalási határidő, és a kettő együtt nem fér bele
    // abba a ~160 karakterbe, amit a Google megjelenít.
    description:
        'Hat új építésű sorház Budapest XI. kerületében. Öt szoba, 117 m² belső tér és 102–317 m² saját kert — nem erkély. Kulcsátadás 2026 szeptemberében.',
    keywords:
        'új építésű sorház Budapest, sorház kerttel Budapest, családi ház Budapest, ingatlan XI. kerület, eladó sorház Spanyolrét',
    openGraph: {
        title: 'Saját kert. Nem erkély. | Spanyolrét Gardens',
        description:
            'Hat sorház Budapest XI. kerületében, 102–317 m² saját kerttel. Kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban. Kulcsátadás 2026 szeptemberében.',
        type: 'website',
        locale: 'hu_HU',
    },
};

export default function HungarianLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    /* The root layout owns <html lang="en"> and a nested layout cannot change
     * it, so the Hungarian subtree was inheriting English. That breaks
     * hyphenation of compounds (Kulcsrakész, Hőszivattyús) and makes screen
     * readers pronounce Hungarian with English phonetics.
     *
     * `lang` on a wrapper element is valid HTML and scopes correctly to
     * everything inside it. The alternative — moving to app/[locale]/ — is a
     * routing refactor, not a design change.
     */
    return <div lang="hu">{children}</div>;
}
