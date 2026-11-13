# Spanyolrét Gardens : règles du projet

Landing bilingue EN + HU pour les 6 maisons de Spanyolrét Gardens (Budapest XI., S-Patrik Bau Kft.). **Repo PUBLIC** (`rasmodai/spanyolret-gardens`) : aucun secret, aucune valeur de canal, aucun prix par maison dans un fichier, un commit ou une PR. Lire `DESIGN.md` avant toute décision visuelle, `README.md` pour l'exploitation, `docs/RUNBOOK.md` pour la maintenance. `docs/Spanyolret_Gardens_Complete_PRD.md` est un document historique périmé : ne rien en reprendre.

## Faits à ne pas écraser
6 maisons A1–B3 (surfaces et jardins dans `lib/data.ts`) ; A3 et B2 vendues ; une seule ancre de prix « From 216 616 000 HUF » (B3 promo, dépôt avant le 1/12/2026), jamais de prix par maison ; parking 2 places A1/A2/B1, 1 place B3, place offerte 4 000 000 Ft sous condition de dépôt ; clés avril 2027 ; Törökbálinti út, 1112 Budapest ; S-Patrik Bau Kft. responsable du traitement ; WhatsApp +36 70 370 1479 ; accent `--lawn` #3F6B2E, rayon 0 ; « A real garden. Not a balcony. ». « 100 % dans les délais » et BOSCH retirés : ne pas réintroduire.

- Affichage : EN `216,616,000 HUF`, HU `216 616 000 Ft`, jamais sans son qualificatif (voir Prix). Sans l'offre parking, l'ancre est 220 616 000 (`anchorPrice.withoutGiftHuf`).
- Sources : `lib/data.ts` (maisons, adresse), `lib/project-config.ts` (le reste, un commentaire de source par valeur). Valeur inconnue = `null` : la ligne ou la section disparaît, jamais de « à confirmer » visible ni de faux chiffre.
- `callNumber` = `+36 70 370 1398`, le même numéro que City Gate (décision de Rémi du 13/11/2026). Il alimente le choix « Felhívom a kivitelezőt » de la section formulaire, le bouton Hívás de la barre mobile (`callNumber ?? contactPhone`) et le bouton d'appel de la fiche maison (maisons disponibles seulement). Mis à `null`, le choix d'appel et le bouton de la fiche disparaissent (le formulaire reste ouvert) ; la barre mobile retombe sur `contactPhone` (Brenda), comme avant le 13/11. Le numéro de Brenda (WhatsApp, pied de page) ne change pas.
- L'offre parking expire le 1/12/2026 : `npm test` échoue exprès à partir du 2/12/2026 tant que `parkingGift.enabled` est `true`. On ne contourne pas le test, on retire l'offre (`docs/RUNBOOK.md` § 3.3).

## Décisions de Rémi (12/11/2026)
- D1 Registre HU : **« Ön » partout** (`scripts/tutoiement.ts`, lancé par `npm test`).
- D2 Sections resserrées comme City Gate : garder Galerie, Developer, Specs ; TrustBar, ProblemSolution, PropertyOverview, Benefits fusionnés dans « Pourquoi ici » (`WhyHere`, ramené à 4 cartes illustrées au lot 7 : chiffres de l'aperçu dans le hero, faits des avantages dans les blocs de `Specs`, mur de logos retiré) ; badge flottant « N of 6 still available » retiré.
- D3 Indexation : indexable avec garde-fou (`lib/indexing.ts`), `ALLOW_INDEXING=true` posé en prod seulement, canonical + hreflang.
- D4 Mixpanel : projet UE dédié à ce site, jeton en variable `NEXT_PUBLIC_MIXPANEL_TOKEN`, jamais en dur.

## Architecture
- Un seul arbre de composants : `components/LandingPage.tsx` reçoit la langue et les textes ; ordre : Navbar, Hero, WhyHere (4 cartes illustrées), Breath, Gallery (carrousel + visionneuse), FloorPlans (plan de masse interactif + fiche par maison, `HouseSheet`), CtaBand, Pricing, Breath, Location, Developer, Specs (6 blocs + liste repliée), CtaBand, Process (frise), FAQ, Breath, LeadForm (deux choix en tête, `LeadChoice` : appeler le kivitelező, ou « Csak további információt kérek » qui déplie le formulaire ; les boutons de message le déplient directement, les liens `#lead-form` arrivent sur le choix : voulu par Rémi le 13/11), Footer, StickyActions ; `components/motion/PageMotion.tsx` (apparitions, parallaxe, frise) et `HeroCounters.tsx` ne rendent rien.
- Tout le texte est dans `lib/copy/en.ts` et `lib/copy/hu.ts` (forme dans `lib/copy/types.ts`, valeurs dérivées dans `lib/copy/shared.ts`). Un changement de texte touche toujours les deux.
- `lib/format.ts` : seul endroit qui formate prix, surfaces, dates. `lib/project-config.ts` : faits du projet. `lib/data.ts` : maisons.
- `lib/data.ts` ne s'importe jamais depuis un fichier `'use client'` : le navigateur reçoit `lib/houses-view.ts` (chaînes d'affichage, aucun prix).
- Lead : `app/api/lead/route.ts` + `lib/lead/*` (OS, Sheet, e-mail, Meta CAPI, limite par IP). Chaque canal est indépendant ; un canal sans configuration est sauté ; aucun canal de capture réussi = 503 et log `Lead not captured`, jamais un remerciement pour un lead perdu.
- **Mouvement (lot 7)** : CSS + IntersectionObserver + rAF, aucune dépendance. Le HTML serveur porte l'état final ; JS ne pose un état de départ (`.pre`) que sous la ligne de flottaison, avec filet de sécurité ; `prefers-reduced-motion` = rien ne bouge. Un bloc qui doit apparaître reçoit `data-reveal` (ou `data-reveal="2"` pour le second pas). Détail : `DESIGN.md` → Motion → Lot 7. Les 9 rendus sont dans `lib/renders.ts`, la géométrie du plan dans `lib/site-plan.ts`.
- Suivi : `lib/mixpanel.ts`, `lib/consent.ts`, `components/consent/*`. Mixpanel et le Pixel Meta ne partent qu'après acceptation du bandeau ; événements sans nom, e-mail ni téléphone.
- SEO : `lib/indexing.ts`, `lib/metadata.ts`, `next.config.js` (en-tête), `app/robots.ts`, `app/sitemap.ts`. Pas de JSON-LD sur le site. `public/Spanyolret-gardens.pdf` (prix d'options) est noindex quoi qu'il arrive.

## Règles
- **Prix** : un seul nombre, l'ancre, jamais sans son qualificatif (EN « Turnkey — landscaping and one parking space included », HU « Kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban », plus l'échéance du 1/12/2026 tant que l'offre est ouverte). Jamais « tout compris » : les options sont payantes en plus. **Jamais de prix par maison** : chaque maison affiche « Price on request » / « Ár kérésre ». Aucun champ de prix dans `lib/data.ts` ni dans le bundle client.
- **Hongrois** : « Ön » partout, `lang="hu"` sur `/hu`, formats HU `216 616 000 Ft`, `117,45 m²`, `2027. április` (point après l'année obligatoire). Relu par Brenda avant publication.
- **Bilingue** : un composant doit survivre à ±40 % de longueur de texte (HU de −43 % à +28 %). Titres sur deux lignes en `line-height: 1.12`.
- **Aucune valeur de canal en dur** (ID de Sheet, expéditeur et destinataires, Pixel, client OS) : tout passe par l'environnement, voir `.env.example`. Noms de variables seulement dans les commits et PR.
- **Crédibilité** : pas de fausse urgence (compte à rebours, « plus que N », point clignotant), pas de témoignage ni de statistique inventés, pas de superlatif invérifiable, pas de photo de stock, pas d'emoji. Pas de logo de marque qui ne soit pas dans le descriptif technique (VEKA et SIEMENS sont des alternatives, pas des engagements). Test : si un acheteur demande « comment le savez-vous ? », il faut pouvoir répondre sans dire « c'est du marketing ».
- **Design** : rayon 0, aucun `box-shadow`, un seul accent `--lawn` `#3F6B2E` (le bleu marine `#1B3B6F` est retiré), toute grandeur mesurée (m², HUF, dates) en IBM Plex Mono à chiffres tabulaires, polices avec `latin-ext` (ő, ű), jamais de classe de palette Tailwind par défaut. Les largeurs de ruban de jardin viennent de `lib/data.ts`.
- **Avant de livrer** : `npx tsc --noEmit`, `npm test`, `npm run build`. `npm test` ne touche pas au réseau.
- Le dossier de travail local (scripts CRM Python, apps-script, `.docx`, `Project Context/`, `google_token.pickle`) est dans `.gitignore` : ne jamais l'ajouter au dépôt.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
