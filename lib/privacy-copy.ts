/* The privacy policy, EN and HU. Says what the site actually does, nothing more.
 * Adapted from City Gate Residences (same controller, same team, same tools),
 * minus Mixpanel, which this site does not load. */

export interface PrivacySection {
    title: string;
    paragraphs: string[];
    items?: string[];
}

export const privacyCopy = {
    en: {
        metaTitle: 'Privacy policy | Spanyolrét Gardens',
        title: 'Privacy policy',
        intro: 'This page explains what personal data the Spanyolrét Gardens website collects, why, who receives it, and how you can exercise your rights under the General Data Protection Regulation (GDPR).',
        controllerTitle: 'Who is responsible for your data',
        labels: { name: 'Data controller', address: 'Address', email: 'Email', registration: 'Company registration number' },
        onBehalf: 'The people who answer your enquiry and handle the sale of the townhouses act on its behalf and on its instructions.',
        sections: [
            {
                title: 'What we collect',
                paragraphs: ['Through the viewing form:'],
                items: [
                    'your first name and phone number, and your email address if you give it;',
                    'the house, what matters most to you and your timeframe, if you choose them;',
                    'your agreement to be contacted;',
                    'the language and the address of the page from which you sent the form, including the advertising campaign that brought you to it, if any (utm_ parameters).',
                ],
            },
            {
                title: 'If you write to us on WhatsApp or by SMS',
                paragraphs: [
                    "Before WhatsApp or your SMS app opens, the form records your answers and your agreement to be contacted, so that we can call you back even if the message never arrives. The conversation itself then takes place on WhatsApp, under WhatsApp's own terms, or by SMS through your mobile operator.",
                ],
            },
            {
                title: 'Technical data',
                paragraphs: [
                    'Like any website, our hosting provider processes your IP address and browser details to deliver the pages.',
                    'To protect the form against abuse, the number of requests sent from one IP address may be limited. Only a one-way (hashed) form of the address is stored for this, and only for the duration of the limit, one hour by default.',
                ],
            },
            {
                title: 'Why, and on what legal basis',
                paragraphs: [],
                items: [
                    'To answer your enquiry and arrange a visit: your consent, given with the required box (GDPR Article 6(1)(a)), and steps taken at your request before a possible contract (Article 6(1)(b)).',
                    'To measure our advertising: your consent, given with the cookie banner (Article 6(1)(a)). Only if you accepted, and then send the form, a hashed form of your name, phone number and email address, with your IP address and browser details, is sent to Meta to count the enquiry as a result of our ads (Meta Conversions API).',
                    'To protect the form against abuse: our legitimate interest (Article 6(1)(f)).',
                ],
            },
            {
                title: 'What is required, and what is not',
                paragraphs: [
                    'Your first name, phone number and agreement to be contacted are needed to answer your enquiry: without them, the form cannot be sent. Everything else is optional. No law or contract obliges you to provide any of this data.',
                    'No decision that affects you is taken solely by automated means (GDPR Article 22).',
                ],
            },
            {
                title: 'Who receives your data',
                paragraphs: ['Your enquiry is read only by the people handling the sale of Spanyolrét Gardens on behalf of the data controller. We use the following service providers, each for its own purpose only:'],
                items: [
                    'Vercel: website hosting;',
                    'Resend: email notification of your enquiry;',
                    'Google: storage of enquiries in Google Sheets, and the map (Google Maps), only as described below;',
                    'Neon: hosting of the database of our internal sales tool;',
                    'WhatsApp (Meta Platforms): only if you choose to write to us on WhatsApp;',
                    'Meta Platforms: advertising measurement, only as described above.',
                ],
            },
            {
                title: 'Transfers outside the European Union',
                paragraphs: ['Some of these providers are based in the United States or belong to groups based there, so your data may be transferred outside the European Economic Area. Each provider sets out its safeguards for such transfers in its own data processing terms.'],
            },
            {
                title: 'Cookies and browser storage',
                paragraphs: [
                    'Without your agreement, the site stores only two things in your browser: your light or dark display choice and your cookie choice. Neither is sent to us.',
                    'Only if you click "Accept" on the cookie banner is the Meta Pixel loaded (cookies such as _fbp and _fbc). You can change your choice at any time with the "Cookie settings" link at the bottom of the page.',
                    'The Google Maps map is loaded from Google only if you accepted cookies or clicked "Show the map". Google then receives your IP address and browser details and may set its own cookies, under its own terms.',
                ],
            },
        ] as PrivacySection[],
        retentionTitle: 'How long we keep your data',
        retention: 'We keep your enquiry while the townhouses of Spanyolrét Gardens are on sale, and delete it at the latest 24 months after our last exchange with you, or earlier if you ask. If you buy a townhouse, the sale contract and the law set how long the related documents are kept.',
        rightsTitle: 'Your rights',
        rights: [
            'access to your data and a copy of it;',
            'correction of inaccurate data;',
            'erasure of your data;',
            'restriction of processing, and objection to processing based on our legitimate interest;',
            'data portability;',
            'withdrawal of your consent at any time, without affecting the lawfulness of processing before the withdrawal.',
        ],
        rightsContact: 'To exercise these rights, write to:',
        complaint: 'You may also lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH, naih.hu), or go to court.',
        updated: 'Last updated:',
        back: 'Back to the homepage',
        backHref: '/',
        cookieSettings: 'Cookie settings',
    },
    hu: {
        metaTitle: 'Adatkezelési tájékoztató | Spanyolrét Gardens',
        title: 'Adatkezelési tájékoztató',
        intro: 'Ez az oldal bemutatja, milyen személyes adatokat gyűjt a Spanyolrét Gardens weboldala, milyen célból, kik kapják meg azokat, és hogyan gyakorolhatja az általános adatvédelmi rendelet (GDPR) szerinti jogait.',
        controllerTitle: 'Ki felel az Ön adataiért',
        labels: { name: 'Adatkezelő', address: 'Cím', email: 'E-mail', registration: 'Cégjegyzékszám' },
        onBehalf: 'Az érdeklődésére válaszoló és a sorházak értékesítésével foglalkozó személyek az adatkezelő nevében és utasításai szerint járnak el.',
        sections: [
            {
                title: 'Milyen adatokat gyűjtünk',
                paragraphs: ['Az időpontfoglaló űrlapon keresztül:'],
                items: [
                    'keresztnevét és telefonszámát, valamint e-mail-címét, ha megadja;',
                    'a választott sorházat, azt, ami a legfontosabb Önnek, és a tervezett költözés idejét, ha megadja őket;',
                    'a kapcsolatfelvételhez adott hozzájárulását;',
                    'a nyelvet és annak az oldalnak a címét, ahonnan az űrlapot elküldte, beleértve azt a hirdetési kampányt is, amelyen keresztül az oldalra érkezett, ha van ilyen (utm_ paraméterek).',
                ],
            },
            {
                title: 'Ha WhatsAppon vagy SMS-ben ír nekünk',
                paragraphs: [
                    'Mielőtt a WhatsApp vagy az SMS-alkalmazása megnyílik, az űrlap rögzíti a válaszait és a kapcsolatfelvételhez adott hozzájárulását, hogy akkor is visszahívhassuk, ha az üzenet nem érkezik meg. Maga a beszélgetés ezután a WhatsAppon, a WhatsApp saját feltételei szerint, vagy SMS-ben, mobilszolgáltatóján keresztül zajlik.',
                ],
            },
            {
                title: 'Technikai adatok',
                paragraphs: [
                    'Mint minden weboldal esetében, tárhelyszolgáltatónk az oldalak megjelenítéséhez kezeli az Ön IP-címét és böngészőjének adatait.',
                    'Az űrlap visszaélések elleni védelme érdekében korlátozhatjuk az egy IP-címről érkező kérések számát. Ehhez csak a cím egyirányú (hash) formáját tároljuk, és csak a korlátozás idejére, alapértelmezés szerint egy óráig.',
                ],
            },
            {
                title: 'Milyen célból és milyen jogalapon',
                paragraphs: [],
                items: [
                    'Érdeklődésének megválaszolása és a látogatás egyeztetése: az Ön hozzájárulása, amelyet a kötelező jelölőnégyzettel ad meg (GDPR 6. cikk (1) bekezdés a) pont), valamint az Ön kérésére, egy esetleges szerződés megkötését megelőzően tett lépések (6. cikk (1) bekezdés b) pont).',
                    'Hirdetéseink mérése: az Ön hozzájárulása, amelyet a sütikről szóló sávban ad meg (6. cikk (1) bekezdés a) pont). Csak ha elfogadta, és ezután elküldi az űrlapot, nevének, telefonszámának és e-mail-címének hash formáját, IP-címével és böngészőjének adataival együtt, elküldjük a Metának, hogy az érdeklődést hirdetéseink eredményeként számolja el (Meta Conversions API).',
                    'Az űrlap védelme a visszaélésekkel szemben: jogos érdekünk (6. cikk (1) bekezdés f) pont).',
                ],
            },
            {
                title: 'Mely adatok megadása kötelező',
                paragraphs: [
                    'Érdeklődésének megválaszolásához szükségünk van keresztnevére, telefonszámára és a kapcsolatfelvételhez adott hozzájárulására: ezek nélkül az űrlap nem küldhető el. Minden más adat megadása önkéntes. Jogszabály vagy szerződés nem kötelezi Önt egyik adat megadására sem.',
                    'Önre vonatkozó, kizárólag automatizált adatkezelésen alapuló döntést nem hozunk (GDPR 22. cikk).',
                ],
            },
            {
                title: 'Kik kapják meg az adatait',
                paragraphs: ['Érdeklődését kizárólag azok olvassák, akik az adatkezelő megbízásából a Spanyolrét Gardens sorházainak értékesítésével foglalkoznak. Az alábbi szolgáltatókat vesszük igénybe, mindegyiket csak a saját céljára:'],
                items: [
                    'Vercel: a weboldal tárhelye;',
                    'Resend: e-mail-értesítés az Ön érdeklődéséről;',
                    'Google: az érdeklődések tárolása Google Táblázatokban, valamint a térkép (Google Térkép), kizárólag az alább leírtak szerint;',
                    'Neon: belső értékesítési rendszerünk adatbázisának tárhelye;',
                    'WhatsApp (Meta Platforms): csak ha Ön úgy dönt, hogy WhatsAppon ír nekünk;',
                    'Meta Platforms: hirdetések mérése, kizárólag a fent leírt módon.',
                ],
            },
            {
                title: 'Adattovábbítás az Európai Gazdasági Térségen kívülre',
                paragraphs: ['Szolgáltatóink egy része az Egyesült Államokban működik, vagy ott működő vállalatcsoporthoz tartozik, ezért adatai az Európai Gazdasági Térségen kívülre is kerülhetnek. Az ilyen továbbításra vonatkozó garanciákat az egyes szolgáltatók saját adatfeldolgozási feltételei rögzítik.'],
            },
            {
                title: 'Sütik és böngészőben tárolt adatok',
                paragraphs: [
                    'Hozzájárulása nélkül az oldal csak két dolgot tárol a böngészőjében: a világos vagy sötét megjelenésre vonatkozó választását és a sütikkel kapcsolatos döntését. Egyiket sem küldjük el magunknak.',
                    'Csak ha a sütikről szóló sávban az „Elfogadom” gombra kattint, akkor töltődik be a Meta Pixel (például _fbp és _fbc sütik). Döntését bármikor módosíthatja az oldal alján a „Süti-beállítások” hivatkozással.',
                    'A Google Térkép csak akkor töltődik be a Google-tól, ha elfogadta a sütiket, vagy a „Térkép megjelenítése” gombra kattintott. Ekkor a Google megkapja IP-címét és böngészőadatait, és saját sütiket helyezhet el, a saját feltételei szerint.',
                ],
            },
        ] as PrivacySection[],
        retentionTitle: 'Meddig őrizzük meg az adatait',
        retention: 'Érdeklődését addig őrizzük meg, amíg a Spanyolrét Gardens sorházai értékesítés alatt állnak, és legkésőbb az utolsó kapcsolatfelvételünket követő 24 hónap elteltével, vagy kérésére korábban, töröljük. Ha sorházat vásárol, a kapcsolódó dokumentumok megőrzési idejét az adásvételi szerződés és a jogszabályok határozzák meg.',
        rightsTitle: 'Az Ön jogai',
        rights: [
            'hozzáférés az adataihoz és másolat kérése;',
            'a pontatlan adatok helyesbítése;',
            'adatainak törlése;',
            'az adatkezelés korlátozása, valamint tiltakozás a jogos érdeken alapuló adatkezelés ellen;',
            'adathordozhatóság;',
            'hozzájárulásának bármikori visszavonása, amely nem érinti a visszavonás előtti adatkezelés jogszerűségét.',
        ],
        rightsContact: 'Jogai gyakorlásához írjon az alábbi címre:',
        complaint: 'Panaszt nyújthat be a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, naih.hu), vagy bírósághoz fordulhat.',
        updated: 'Utolsó módosítás:',
        back: 'Vissza a főoldalra',
        backHref: '/hu',
        cookieSettings: 'Süti-beállítások',
    },
};
