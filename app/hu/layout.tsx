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
