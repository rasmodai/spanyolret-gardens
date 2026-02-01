import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Spanyolrét Gardens | Prémium sorházak saját kerttel | Budapest XI. kerület',
    description: '6 exkluzív új építésű sorház Budapest XI. kerületében. 117 m² belső tér + akár 317 m² saját kert. Hőszivattyú, padlófűtés, prémium anyagok. Átadás 2026 őszén.',
    keywords: 'új építésű sorház Budapest, sorház kerttel Budapest, családi ház Budapest, ingatlan XI. kerület, eladó sorház Spanyolrét',
    openGraph: {
        title: 'Spanyolrét Gardens | Prémium sorházak saját kerttel | Budapest',
        description: '6 exkluzív új építésű sorház Budapest XI. kerületében. 117 m² belső tér + akár 317 m² saját kert.',
        type: 'website',
        locale: 'hu_HU',
    },
};

export default function HungarianLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
