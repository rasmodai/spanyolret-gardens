import {
    formatArea,
    formatAreaRange,
    formatDateUntilHu,
    formatPrice,
    formatYearMonth,
    formatYearMonthInHu,
} from '../format';
import { joinIds, shared } from './shared';
import type { Copy } from './types';

/* Magyar. Mindenhol „Ön” (magázás), tegezés sehol (Rémi döntése, 2026.11.12.).
 * A számok a lib/data.ts-ből és a lib/project-config.ts-ből jönnek a
 * lib/format.ts-en át; ez a fájl a mondatokat tartalmazza. */

const keys = shared.handover ? formatYearMonth(shared.handover, 'hu') : null;
const keysIn = shared.handover ? formatYearMonthInHu(shared.handover) : null;
const depositUntil = formatDateUntilHu(shared.giftDepositBy);
const interior = formatAreaRange(shared.interiorRange.min, shared.interiorRange.max);
const garden = formatAreaRange(shared.gardenRange.min, shared.gardenRange.max);
const gardenFrom = Math.round(shared.gardenRange.min);
const gardenTo = Math.round(shared.gardenRange.max);
const terrace = formatArea(shared.terraceArea, 'hu');
const parkingPrice = formatPrice(shared.parkingSpacePriceHuf, 'hu');
const twoSpaces = joinIds(shared.parkingTwo, 'és');
const oneSpace = joinIds(shared.parkingOne, 'és');
const projects = `${shared.developer.projectsFinished}`;
const anchor = formatPrice(shared.anchorHuf, 'hu');

const priceQualifier = shared.giftOn
    ? `Kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban – a ${depositUntil} beérkező foglaló esetén`
    : 'Kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban';

const parkingIncluded =
    `Kültéri parkoló: az ${twoSpaces} házhoz kettő, a ${oneSpace} házhoz egy` +
    (shared.giftOn ? ` (egy hely ingyenes a ${depositUntil} beérkező foglaló esetén)` : '');

const parkingAnswer =
    `Az ${twoSpaces} házhoz két, a ${oneSpace} házhoz egy kültéri parkolóhely tartozik. Egy további parkolóhely ára ${parkingPrice}. ` +
    (shared.giftOn ? `A ${depositUntil} beérkező foglaló esetén egy hely ingyenes. ` : '') +
    'Távirányítós kapu. Vége az utcai parkolásnak.';

export const hu: Copy = {
    /* Ár nélkül, mint az angol változatban: az ártól elválaszthatatlan a
     * foglalási határidő, és a kettő együtt nem fér bele abba a ~160
     * karakterbe, amit a Google megjelenít. */
    meta: {
        title: `Spanyolrét Gardens | Sorházak ${garden} saját kerttel | Budapest XI.`,
        description: `Hat új építésű sorház Budapest XI. kerületében. Öt szoba, ${interior} belső tér és ${gardenFrom}–${gardenTo} m² saját kert – nem erkély.${keysIn ? ` Kulcsátadás ${keysIn}.` : ''}`,
        ogTitle: 'Saját kert. Nem erkély. | Spanyolrét Gardens',
        ogDescription: `Hat sorház Budapest XI. kerületében, ${gardenFrom}–${gardenTo} m² saját kerttel. Kulcsrakész átadás, teljes kertépítés és kültéri parkoló az árban.${keysIn ? ` Kulcsátadás ${keysIn}.` : ''}`,
        ogLocale: 'hu_HU',
    },

    nav: {
        ariaLabel: 'Oldalon belüli navigáció',
        backToTop: 'Vissza a tetejére',
        links: [
            { id: 'why-here', label: 'Áttekintés' },
            { id: 'gallery', label: 'Galéria' },
            { id: 'floor-plans', label: 'A hat kert' },
            { id: 'location', label: 'Elhelyezkedés' },
        ],
        cta: 'Időpontot kérek',
        themeDark: 'Sötét',
        themeLight: 'Világos',
    },

    hero: {
        place: keys ? `Budapest XI. · ${keys}` : 'Budapest XI.',
        titleFirst: 'Saját kert.',
        titleSecond: 'Nem erkély.',
        lede: `Hat sorház Budapest XI. kerületében, két épületben. Öt szoba két szinten, és egy kert, ami ${gardenFrom}-től ${gardenTo} m²-ig terjed.`,
        facts: [
            { value: `${shared.houseCount}`, label: 'Sorház' },
            { value: interior, label: 'Belső tér' },
            { value: garden, label: 'Saját kert' },
            ...(keys ? [{ value: keys, label: 'Kulcsátadás' }] : []),
        ],
        ctaPrimary: 'Időpontot kérek',
        ctaSecondary: 'A hat kert',
    },

    price: {
        anchor: `${anchor}-tól`,
        qualifier: priceQualifier,
    },

    whyHere: {
        eyebrow: 'Miért itt',
        title: 'Senki nem tervezi, hogy hetven négyzetméteren nevel két gyereket.',
        lede: 'A munka miatt költözött ide, és jól alakult. Aztán megszületett a második gyerek, az otthoni iroda a hálószoba sarka lett, és három utcával arrébb kezdett parkolni.',
        nowLabel: 'A mostani hétköznapok',
        cards: [
            {
                shot: 'dusk',
                now: 'Az iroda a hálószoba sarka',
                title: `${Math.round(shared.interiorRange.min)} m², öt szoba, két szint`,
                text: 'Egy szoba, ahol dolgozni lehet, becsukható ajtóval. Kamra, háztartási helyiség, gardrób.',
                meta: null,
            },
            {
                shot: 'lawn',
                now: 'Egy erkély még nem kert',
                title: `${gardenFrom} és ${gardenTo} m² közötti kert`,
                text: 'Kézi vetésű fű, körbekerítve, a nappaliból nyíló ajtóval. A teraszról az egészet belátja.',
                meta: null,
            },
            {
                shot: 'walk',
                now: 'Húsz perc parkolóhelyet keresni',
                title: 'Parkolás a kapu mögött, amelyet az autóból nyithat ki',
                text: 'Megérkezik, a kapu kinyílik, beáll.',
                meta: `Az ${twoSpaces} házhoz két, a ${oneSpace} házhoz egy kültéri parkolóhely tartozik.`,
            },
            {
                shot: 'wine',
                now: 'Évi 6 millió, és egy forint sem az Öné',
                title: 'A törlesztés olyanba megy, ami az Öné',
                text: 'Havi 500 ezer forinttal egy ház jó részét már kifizette. Csak nem a sajátját. A budapesti piacról nem fogunk előrejelzést adni. De a pénz többé nem vész el.',
                meta: null,
            },
        ],
    },

    gallery: {
        eyebrow: 'A helyszín',
        title: 'Így néz ki itt egy szombat.',
        lede: keysIn
            ? `Ezek látványtervek, nem fényképek – az épületek ${keysIn} készülnek el. A rajtuk látható méretek megegyeznek a tervek méreteivel.`
            : 'Ezek látványtervek, nem fényképek. A rajtuk látható méretek megegyeznek a tervek méreteivel.',
        shots: [
            {
                key: 'midday',
                alt: 'Kerti homlokzat a terasszal és a gyeppel, délben',
                caption: `A terasz egyenesen a fűre nyílik. ${terrace}, porcelán burkolattal.`,
            },
            {
                key: 'children',
                alt: 'Gyerekek szaladnak a saját kert gyepén',
                caption: 'Körbekerítve. A konyhából az egész kert belátható.',
            },
            {
                key: 'barbecue',
                alt: 'Család a teraszon ebédel',
                caption: 'Szombat. Ezért költöznek el az emberek a belvárosból.',
            },
            {
                key: 'aerial',
                alt: 'Légi felvétel a két épületről és a hat kertről',
                caption: 'Két épület, egyenként három ház. Minden kert más méretű.',
            },
            {
                key: 'dusk',
                alt: 'A két épület alkonyatkor, kivilágított ablakokkal, a kert felől nézve',
                caption: 'A két épület alkonyatkor.',
            },
            {
                key: 'wine',
                alt: 'Egy pár borozik a teraszon este, mögöttük kivilágított nappali',
                caption: 'Egy este a teraszon.',
            },
            {
                key: 'path',
                alt: 'Négytagú család sétál a ház előtti kikövezett ösvényen',
                caption: 'A kerti ösvényen.',
            },
            {
                key: 'walk',
                alt: 'Négytagú család a kerti ösvényen, a homlokzat közelében',
                caption: 'Séta a kertben.',
            },
            {
                key: 'lawn',
                alt: 'Két gyerek fut át a gyepen, mögöttük a ház',
                caption: 'Gyerekek a gyepen.',
            },
        ],
        ui: {
            region: 'Galéria, görgessen oldalra',
            hint: 'Húzza, görgesse vagy használja a nyilakat · kattintson a nagyításhoz',
            previousImage: 'Előző kép',
            nextImage: 'Következő kép',
            enlarge: 'Nagyítás: {alt}',
            viewer: 'Képnézegető',
            close: 'Bezárás',
            previous: 'Előző',
            next: 'Következő',
        },
    },

    houses: {
        eyebrow: 'A hat kert',
        title: 'Hatszor ugyanaz a ház. A kert az, ami változik.',
        lede: `Mindegyikben öt szoba két szinten, két fürdőszoba és ${terrace}-es terasz. A még szabad házaknál a kert ${formatArea(shared.gardenRange.min, 'hu')}-től ${formatArea(shared.gardenRange.max, 'hu')}-ig terjed, alább méretarányosan ábrázolva.`,
        columnHouse: 'Ház',
        columnGarden: 'Saját kert, méretarányosan',
        summary: '{interior} belső · {rooms} szoba · {terrace} terasz',
        priceOnRequest: 'Ár kérésre',
        sheet: {
            open: 'Alaprajz és adatok',
            openAria: 'Alaprajz és adatok megnyitása: {id} ház',
            close: 'Bezárás',
            previous: 'Előző',
            next: 'Következő',
            zoomIn: 'Nagyítás',
            zoomOut: 'Kicsinyítés',
            facts: {
                interior: 'Belső alapterület',
                groundFloor: 'Földszint',
                firstFloor: 'Emelet',
                terrace: 'Terasz',
                garden: 'Saját kert',
                rooms: 'Szobák',
                parking: 'Parkolás',
            },
            parking: { one: '{count} parkolóhely', other: '{count} parkolóhely' },
            askMessage: 'Érdeklődöm: {id} ház',
            askCallBack: 'Visszahívást kérek: {id} ház',
            callNow: 'Felhívom Önöket',
            callRevealed: 'koppintson a híváshoz',
        },
        statuses: { available: 'Elérhető', reserved: 'Foglalt', sold: 'Elkelt' },
        highlights: {
            largestInterior: 'Legnagyobb belső tér',
            smallestGarden: 'Legkisebb kert',
            largestGarden: 'Legnagyobb kert',
        },
        note: 'A B1 láthatóan a legkisebb, és ezt így is hagytuk. Ha egy sávban akkor is megbízhat, amikor az nem hízelgő, akkor az A2-nél is megbízhat benne.',
        ribbon: {
            garden: 'kert',
            ofLargest: 'a legnagyobb {percent}%-a',
            aria: '{area} kert, a legnagyobb kert {percent} százaléka',
        },
        plans: {
            sitePlan: 'Helyszínrajz',
            sitePlanAlt: 'Helyszínrajz: két, egyenként három házból álló épület, minden háznak saját kerttel',
            soldChip: 'elkelt',
            siteHint: 'vigye fölé az egeret, vagy koppintson egy telekre',
            house: '{id} ház',
            groundFloor: 'Földszint',
            firstFloor: 'Emelet',
            siteCaption: '{architect} · M 1:250',
            planCaption: 'méretarányosan újrarajzolva az építési engedélyezési tervről, a rajta szereplő nettó alapterületekkel',
            roomNames: {
                entrance: 'Előszoba', shower: 'Zuhanyzó', living: 'Nappali', bedroom: 'Szoba', kitchenDining: 'Konyha-étkező',
                pantry: 'Kamra', stairs: 'Lépcső', hallway: 'Közlekedő', wc: 'WC', wardrobe: 'Gardrób', utility: 'Háztartási',
                bathroom: 'Fürdőszoba', terrace: 'Terasz',
            },
        },
    },

    pricing: {
        eyebrow: 'Árazás',
        title: 'Mit fedez az ár, és mit nem.',
        lede: 'Kulcsot kap, nem szerkezetkész házat. A kertek mérete között közel kétszeres a különbség, ezért a kiválasztott ház árát közvetlenül tőlünk tudhatja meg.',
        includedTitle: 'Az árban',
        included: [
            'Kulcsrakész átadás (azonnal beköltözhető)',
            parkingIncluded,
            `${terrace}-es terasz porcelán burkolattal`,
            'Teljes kertépítés (fű, járda, kerítés)',
            'Minden elektromos és vízvezeték-szerelvény',
            'LEGRAND kapcsolók és konnektorok',
            'Padlófűtési rendszer',
            'Fan-coil hűtőegységek',
        ],
        extrasTitle: 'Felár ellenében',
        extras: [
            { item: 'További parkolóhely', price: parkingPrice },
            { item: 'Mennyezeti fűtés-hűtés', price: 'Egyedi árajánlat' },
            { item: 'Motoros redőny', price: 'Egyedi árajánlat' },
            { item: 'Napelem telepítése', price: 'Egyedi árajánlat' },
            { item: 'Kerti öntözőrendszer', price: 'Egyedi árajánlat' },
        ],
        extrasNote: `Ezek egyike sincs benne a ${anchor}-os összegben. Azért itt soroljuk fel őket, és nem a szerződésnél, mert az utólag kiderülő tételektől érzi úgy az ember, hogy valamit ráerőltettek.`,
        cta: 'Kérem az árat',
        scheduleNote:
            'A fizetési ütemezést és a finanszírozást a foglalási dokumentumok rögzítik. Mindkettőt végigvesszük Önnel, mielőtt bármit aláír.',
    },

    location: {
        eyebrow: 'Elhelyezkedés',
        title: 'Húsz perc a belvárostól. A zajból semmi.',
        lede: 'Spanyolrét nem belváros, és nem is teszünk úgy, mintha az lenne. Amit a plusz tizenöt percért kap, az egy utca, ahol nem történik semmi.',
        mapTitle: 'Spanyolrét Gardens elhelyezkedése a Google Térképen',
        mapShow: 'Térkép megjelenítése',
        mapNote: 'A térképet a Google Térkép szolgáltatja, amely saját sütiket helyezhet el. Csak kattintásra töltődik be, vagy ha elfogadta a sütiket.',
        district: 'XI. kerület (Újbuda)',
        mapLink: 'Megnyitás a Google Térképen →',
        gettingAround: 'Közlekedés',
        transport: [
            { name: 'Kelenföld (M4-es metró)', time: '6–8 perc busszal' },
            { name: '40-es, 40B, 88-as és 88A busz', time: '10 perc séta' },
            { name: 'Belváros', time: '15–20 perc autóval' },
            { name: 'Budapesti repülőtér', time: '35 perc autóval' },
        ],
        nearbyTitle: 'A környéken',
        nearby: [
            { category: 'Iskolák', items: ['Brit Nemzetközi Iskola (15 perc)', 'Amerikai Nemzetközi Iskola (20 perc)', 'Helyi általános iskolák (5–10 perc)'] },
            { category: 'Bevásárlás', items: ['Etele Plaza (10 perc)', 'IKEA Budaörs (15 perc)', 'Helyi boltok (5 perc séta)'] },
            { category: 'Egészségügy', items: ['Szent Imre Kórház (10 perc)', 'Magánklinikák a közelben'] },
            { category: 'Kikapcsolódás', items: ['Normafa túraútvonalak (15 perc)', 'Bikás Park (10 perc)', 'Duna-part (20 perc)'] },
        ],
        streetTitle: 'Maga az utca',
        street: [
            'Csendes lakóutcák',
            'Alacsony forgalom',
            'Kialakult családi környék',
            'Zöld környezet',
            'Nincs más új építés az utcában',
        ],
        note: 'Amit a térképen nem tud ellenőrizni: milyen az utca hangja este kilenckor. Jöjjön el, és hallgassa meg, mielőtt bármit eldönt.',
    },

    developer: {
        eyebrow: 'A kivitelező',
        title: 'Akik ténylegesen megépítik.',
        lede: `Az S-Patrik Bau ${shared.developer.since} óta épít Budapesten, és több mint ${projects} projektet adott át. Kérje el a címeket – több is autóval pár percre van Spanyolréttől, és ha megáll egy olyan épület előtt, amelyben hat éve laknak, többet tud meg, mint bármiből ezen az oldalon.`,
        architect: 'Tervező: {name}',
        stats: [
            { value: `${shared.developer.since}`, label: 'Azóta építünk' },
            { value: `${projects}+`, label: 'Átadott projekt' },
            { value: `${shared.yearsBuilding}`, label: 'Éve építünk' },
        ],
        promises: [
            'A teljes műszaki leírás írásban, mielőtt bármire elköteleződne',
            'Törvény szerinti szerkezeti garancia, plusz gyártói garanciák',
            'Minden felárral járó extra előre felsorolva, nem a szerződésnél derül ki',
            'Rendszeres tájékoztatás az építkezés haladásáról',
            'Egy angolul beszélő kapcsolattartó, végig ugyanaz',
            'Átadott projektjeink címei, hogy a kivitelezést maga is megnézhesse',
        ],
    },

    specs: {
        eyebrow: 'Műszaki leírás',
        title: 'Ami a műszaki leírásban szerepel.',
        lede: 'Az alábbi sorok mindegyike benne van a szerződéses dokumentációban. Azért tesszük közzé, mert egy írásban megnevezett márka olyan állítás, amin számon kérhet minket – és egy műszaki leírás jobb válasz, mint egy ígéret.',
        highlights: [
            {
                key: 'walls',
                figure: '30 cm',
                label: 'Külső falak és házelválasztó falak',
                items: [
                    'Kívül Wienerberger Porotherm, közte Silka hangszigetelő tégla',
                    'Hőszigetelés: 12 cm STO rendszer',
                    'Tető: lapostető, zöldtető-előkészítés, 20–26 cm EPS szigetelés',
                ],
            },
            {
                key: 'climate',
                figure: 'Nincs gáz',
                label: 'Hőszivattyú, padlófűtés',
                items: [
                    'Hőszivattyú: Westen Auriga melegvíz-tárolóval',
                    'Fan-coil hűtés minden szinten, szintenként SIEMENS/HONEYWELL termosztát',
                    'Védőcső fut a tetőig. Maga a napelem felár ellenében kapható, nincs benne az árban.',
                ],
            },
            {
                key: 'glazing',
                figure: 'Háromrétegű',
                label: 'Üvegezés, 6 kamrás profil',
                items: [
                    'VEKA 82 / Aluplast Neo ablakprofil, Roto NX vasalat',
                    'Bejárati ajtó: MABISZ-minősített, 4–8 pontos zár',
                    'Árnyékolás: redőny-előkészítés',
                ],
            },
            {
                key: 'electrical',
                figure: '4–10',
                label: 'Konnektor szobánként',
                items: [
                    'Szerelvények: LEGRAND Valena sorozat',
                    'TV/Internet: csatlakozás minden szobában',
                    'Mozgásérzékelő-előkészítés a riasztóhoz, alkonykapcsolós kültéri világítás',
                ],
            },
            {
                key: 'finishes',
                figure: '3',
                label: 'Festékszín az árban',
                items: [
                    'Lakóterekben prémium laminált padló, vizesblokkokban kerámia burkolat',
                    'Terasz: porcelán kőlap (max. 60×60 cm)',
                    'A burkolatokat még építés közben választhatja',
                ],
            },
            {
                key: 'garden',
                figure: '10–15 cm',
                label: 'Humusz, kézi vetésű fű',
                items: [
                    'Kerítés: horganyzott (utca), drótháló (telkek)',
                    'Kapu: távirányítós gépjármű-behajtó',
                    'Öntözés: előkészítés felár ellenében',
                ],
            },
        ],
        fullToggle: 'A teljes műszaki leírás megnyitása ({count} sor)',
        included: 'Tartalmazza',
        categories: [
            {
                id: 'structure',
                title: 'Szerkezet',
                items: [
                    'Alap: sávalap + 15 cm vasalt betonlemez',
                    'Külső falak: 30 cm Wienerberger Porotherm (30%-os hőmegtakarítás)',
                    'Házelválasztó falak: 30 cm Silka hangszigetelő tégla',
                    'Hőszigetelés: 12 cm STO rendszer',
                    'Tető: lapostető, zöldtető-előkészítés, 20–26 cm EPS szigetelés',
                ],
            },
            {
                id: 'climate',
                title: 'Fűtés és hűtés',
                items: [
                    'Hőszivattyú: Westen Auriga melegvíz-tárolóval',
                    'Elosztás: padlófűtés az egész házban',
                    'Hűtés: fan-coil egységek minden szinten',
                    'Vezérlés: SIEMENS/HONEYWELL okos termosztátok szintenként',
                    'Opcionális: mennyezeti fűtés-hűtés felár ellenében',
                ],
            },
            {
                id: 'windows',
                title: 'Nyílászárók',
                items: [
                    'Ablakprofil: 6 kamrás VEKA 82 / Aluplast Neo',
                    'Üvegezés: háromrétegű',
                    'Vasalat: Roto NX',
                    'Bejárati ajtó: MABISZ-minősített, 4–8 pontos zár',
                    'Árnyékolás: redőny-előkészítés',
                ],
            },
            {
                id: 'electrical',
                title: 'Elektromos rendszer',
                items: [
                    'Szerelvények: LEGRAND Valena sorozat',
                    'Konnektorok: 4–10 db szobánként',
                    'TV/Internet: csatlakozás minden szobában',
                    'Riasztó: mozgásérzékelő-előkészítés minden szobában',
                    'Kültéri világítás: alkonykapcsolóval',
                ],
            },
            {
                id: 'finishes',
                title: 'Burkolatok és anyagok',
                items: [
                    'Lakóterek: prémium laminált padló',
                    'Vizesblokkok: kerámia burkolat (8 000 Ft/m²-ig)',
                    'Falak: 2 réteg glett + 2–3 réteg festés (3 szín)',
                    'Terasz: porcelán kőlap (max. 60×60 cm)',
                    'Homlokzat: dörzsölt nemesvakolat',
                ],
            },
            {
                id: 'outdoor',
                title: 'Kert és külső területek',
                items: [
                    'Kertek: 10–15 cm humusz, kézi vetésű fű',
                    'Járdák: KK-BETON London szürke térkő',
                    'Kerítés: horganyzott (utca), drótháló (telkek)',
                    'Kapu: távirányítós gépjármű-behajtó',
                    'Öntözés: előkészítés felár ellenében',
                ],
            },
        ],
        note: 'Kérje el a teljes dokumentumot, és kérje el az öt-hat éve átadott épületeink címét is. Ha megáll az egyik előtt, többet tud meg, mint bármiből ezen az oldalon.',
    },

    process: {
        eyebrow: 'Hogyan zajlik',
        title: 'Ettől az oldaltól a kulcsokig.',
        lede: 'Hat lépés, és a foglalásig bármelyiknél megállhat. A foglalási dokumentumok aláírásáig semmire nem kötelezi magát, azokat pedig aláírás előtt végigvesszük Önnel.',
        steps: [
            { title: 'Egyeztetés', text: 'Beszéljük át az igényeit, és válaszoljunk a kérdéseire.', duration: '30 perc' },
            { title: 'Helyszíni látogatás', text: 'Nézze meg az építkezést és a környéket, képzelje el a leendő otthonát.', duration: '1 óra' },
            { title: 'Ház kiválasztása', text: 'Válasszon az elérhető házak közül. Beszéljük át a burkolati lehetőségeket.', duration: 'Az Ön tempójában' },
            { title: 'Foglalás', text: 'Foglaló befizetésével biztosítsa a házat. Részletes szerződést kap.', duration: '1–2 hét' },
            { title: 'Adásvételi szerződés', text: 'Szerződéskötés közjegyzőnél. Végigvezetjük Önt minden lépésen.', duration: '2–4 hét' },
            {
                title: keys ? `Beköltözés (${keys})` : 'Beköltözés',
                text: 'Megkapja a kulcsokat a kulcsrakész, azonnal beköltözhető otthonához.',
                duration: 'Átadás napja',
            },
        ],
        reassuranceTitle: 'Külföldiként ingatlant venni Magyarországon megoldható. Hogy ez így is maradjon, az a mi dolgunk.',
        reassurance: [
            'Személyes kapcsolattartó',
            'Részletes, érthető szerződések',
            'Javasolt ügyvédek és közjegyzők',
            'Rendszeres építési tájékoztatók',
            'Átlátható kommunikáció végig',
        ],
        cta: 'Időpontot kérek',
    },

    faq: {
        eyebrow: 'Kérdések',
        title: 'Amit valóban meg szoktak kérdezni.',
        lede: 'Ha az Ön kérdése nincs köztük, tegye fel az alábbi űrlapon. Egyenes választ kap akkor is, ha a válasz az, hogy „ezt még nem tudjuk”.',
        groups: [
            {
                title: 'Vásárlási folyamat',
                items: [
                    {
                        q: 'Milyen a fizetési ütemezés?',
                        a: 'Általában: 10%-os foglaló, majd az építkezés alatt ütemezett részletek, az utolsó részlet átadáskor. A pontos feltételeket az egyeztetésen beszéljük át, és az egyéni helyzetéhez igazítjuk.',
                    },
                    {
                        q: 'Lehet hitelből vásárolni?',
                        a: 'Igen, több bank is kínál lakáshitelt új építésű ingatlanokra. Szívesen ajánlunk hiteltanácsadókat, akik segítenek a legjobb konstrukció megtalálásában.',
                    },
                    {
                        q: 'Mi történik, ha csúszik az építkezés?',
                        a: `Az S-Patrik Bau ${shared.developer.since} óta több mint ${projects} projektet adott át. ${keysIn ? `A kulcsátadás ${keysIn} esedékes, a szerződés pedig` : 'A szerződés'} rögzíti, mi történik késedelem esetén, és védi az Ön érdekeit.`,
                    },
                    {
                        q: 'Kell ügyvéd a vásárláshoz?',
                        a: 'Ajánlott, de nem kötelező. Szívesen ajánlunk megbízható ügyvédeket, akik már ismerik a projektet és gördülékenyen intézik az ügyeket.',
                    },
                ],
            },
            {
                title: 'Az ingatlan',
                items: [
                    {
                        q: 'Lehet módosítani a burkolatokat?',
                        a: 'Igen! A befejező munkák előtt választhat csempét, padlót, festékszínt (3 szín az árban). A saját ízlésére szabhatja, mielőtt beköltözik.',
                    },
                    {
                        q: 'Mi van benne az árban?',
                        a: 'Kulcsrakész átadás: padló, fürdőszobai szerelvények, konyha-előkészítés, világítás, fűtés-hűtés, kész kert. Csak be kell költözni.',
                    },
                    {
                        q: 'Vannak havi költségek?',
                        a: 'Minimális közös költség (a közös útfelület fenntartása, szemétgyűjtő hely). Nincs társasházi közös költség, mint a lakásoknál. A rezsi az Öné.',
                    },
                    {
                        q: 'Milyen garanciát kapok?',
                        a: 'Teljes kivitelezési garancia a törvényi előírások szerint, plusz gyártói garancia minden beépített rendszerre (hőszivattyú, nyílászárók stb.). Az S-Patrik Bau az átadás után is a rendelkezésére áll.',
                    },
                ],
            },
            {
                title: 'Környék és életmód',
                items: [
                    {
                        q: 'Milyen messze van a belváros?',
                        a: 'Kb. 20–25 perc autóval vagy tömegközlekedéssel. A kelenföldi M4-es metróállomás busszal 6–8 perc, onnan közvetlenül a központba jut. Tér és nyugalom, mégsem messze.',
                    },
                    {
                        q: 'Vannak jó iskolák a közelben?',
                        a: 'Igen. Helyi általános iskolák 5–10 percre. Nemzetközi iskolák (brit, amerikai) 15–20 percre. Középiskolák is elérhetők a környéken.',
                    },
                    {
                        q: 'Biztonságos a környék?',
                        a: 'Nagyon. A Spanyolrét kialakult családi környék, alacsony bűnözéssel. Csendes, családbarát, jó a közösségi szellem.',
                    },
                    { q: 'Hány parkolóhely jár egy házhoz?', a: parkingAnswer },
                ],
            },
            {
                title: 'Műszaki kérdések',
                items: [
                    {
                        q: 'Mennyire energiatakarékos?',
                        a: 'Nagyon. Hőszivattyús fűtés-hűtés (nincs gáz), 30 cm szigetelt falak, háromrétegű ablakok, padlófűtés. Számítson jóval alacsonyabb rezsire, mint egy régebbi ingatlannál.',
                    },
                    {
                        q: 'Lehet napelemet telepíteni?',
                        a: 'Igen, minden ház napelemre előkészített, a védőcsövek már a helyükön vannak. Telepíthető építés közben vagy átadás után is.',
                    },
                    {
                        q: 'Van klíma?',
                        a: 'Fan-coil hűtőegységek minden szinten. Opcionálisan mennyezeti fűtés-hűtésre is váltható, ami feleslegessé teszi a külső klímát.',
                    },
                    {
                        q: 'Van öntözőrendszer a kertben?',
                        a: 'Öntözés-előkészítés opcionálisan kérhető. A kertet humuszos talajjal és kézi vetésű fűvel adjuk át.',
                    },
                ],
            },
        ],
    },

    leadForm: {
        eyebrow: 'Időpontfoglalás',
        title: 'Látogasson el a sorházakhoz',
        ledeMessaging: 'Válaszoljon néhány rövid kérdésre. Hozza a gyerekeket a látogatásra.',
        ledeNoMessaging:
            'Hozza a gyerekeket. Ők többet mondanak majd 300 m² fűről, mint mi. Egy látogatás, és nem keressük újra, hacsak Ön nem kéri.',
        replyText: 'Budapesti munkaidőben egy órán belül, egyébként másnap reggel elsőként.',
        facts: [
            { title: 'Magyarul és angolul', text: 'A teljes vásárlási folyamat mehet angolul is, ha az kényelmesebb.' },
            {
                title: 'Mit kezdünk az adataival',
                text: 'Csak a Spanyolrét Gardensszel kapcsolatban keressük meg Önt. Nem adjuk tovább senkinek, és egyetlen e-mailjére töröljük az adatait.',
            },
        ],
        replyTodayMessaging: 'Még ma válaszolunk',
        replyTodayCall: 'Még ma felhívjuk',
    },

    form: {
        unit: 'Melyik ház érdekli?',
        unitAny: 'Még nem tudom',
        unitOption: '{id} · {garden} kert',
        priority: 'Mi a legfontosabb az Ön számára?',
        priorities: { outdoor: 'A saját kert', space: 'Az alapterület és az elosztás', location: 'Az elhelyezkedés', price: 'Az ár' },
        timeline: 'Mikor szeretne költözni?',
        timelinePlaceholder: 'Válasszon',
        timelineOptions: [
            { value: 'immediately', label: 'Minél előbb' },
            { value: '3-6-months', label: '3–6 hónapon belül' },
            { value: '6-12-months', label: '6–12 hónapon belül' },
            { value: '12-plus-months', label: 'Több mint 12 hónap múlva' },
        ],
        firstName: 'Keresztnév',
        phone: 'Telefonszám',
        email: 'E-mail (nem kötelező)',
        consent: 'Hozzájárulok, hogy az érdeklődésemmel kapcsolatban felvegyék velem a kapcsolatot.',
        privacyLink: 'Adatkezelési tájékoztató',
        choose: 'Küldés ezzel:',
        opening: 'Az üzenet megnyitása…',
        whatsapp: 'WhatsApp',
        sms: 'SMS',
        note: 'A válaszait is rögzítjük, hogy visszahívhassuk, ha az üzenet nem érkezne meg hozzánk.',
        callBack: 'Inkább visszahívást kérek',
        submit: 'Időpontot kérek',
        sending: 'Küldés…',
        failure: 'Hiba történt, a kérését nem sikerült elküldeni. Kérjük, próbálja újra.',
        rateLimited: 'Az internetkapcsolatáról túl sok kérés érkezett. Kérjük, egy óra múlva próbálja újra.',
        errors: {
            firstName: 'Kérjük, adja meg a keresztnevét',
            phone: 'Kérjük, adja meg a telefonszámát',
            consent: 'A kapcsolatfelvételhez szükségünk van a hozzájárulására',
        },
        message: {
            intro: 'Jó napot! {name} vagyok, a Spanyolrét Gardens sorházai iránt érdeklődöm.',
            unit: 'Ház: {unit}',
            anyUnit: 'Még nem választottam sorházat.',
            priority: 'Számomra a legfontosabb: {priority}',
            timeline: 'Tervezett költözés: {timeline}',
            close: 'Mikor tudnánk egy látogatást egyeztetni?',
        },
        thankYouPath: '/hu/koszonjuk',
    },

    footer: {
        ariaLabel: 'Lábléc',
        tagline: `Hat sorház ${garden} saját kerttel, Budapest XI. kerületében.${keysIn ? ` Kulcsátadás ${keysIn}.` : ''}`,
        cta: 'Időpontot kérek',
        onThisPage: 'Az oldalon',
        links: [
            { id: 'why-here', label: 'Áttekintés' },
            { id: 'floor-plans', label: 'A hat kert' },
            { id: 'specs', label: 'Műszaki leírás' },
            { id: 'location', label: 'Elhelyezkedés' },
            { id: 'faq', label: 'Kérdések' },
        ],
        contact: 'Kapcsolat',
        address: 'Cím',
        email: 'E-mail',
        phone: 'Telefon',
        legalLine: '{name} · Adószám {tax} · Cégjegyzékszám {registration}',
        architect: 'Tervező: {name}',
        privacy: 'Adatkezelési tájékoztató',
        cookieSettings: 'Süti-beállítások',
    },

    ctaBands: {
        afterHouses: {
            title: 'Melyik ház az Öné?',
            text: 'Kérje el bármelyik ház árát, kötelezettség nélkül.',
            primary: 'Kérem az árat',
            message: 'Üzenetet írok',
        },
        afterSpecs: {
            title: 'Más kérdése van?',
            text: 'Írja meg üzenetben, vagy adja meg a számát, és visszahívjuk.',
            primary: 'Hívjanak vissza',
            message: 'Üzenetet írok',
        },
    },
    stickyBar: { ariaLabel: 'Gyors műveletek', viewing: 'Időpontot kérek', message: 'Üzenet', call: 'Hívás' },
    thankYou: {
        metaTitle: 'Köszönjük | Spanyolrét Gardens',
        title: 'Köszönjük.',
        text: 'Megkaptuk a kérését.',
        next: ['24 órán belül visszahívjuk a megadott számon, és egyeztetjük a megtekintés időpontját.'],
        brochureLead: 'Addig is letöltheti a brosúránkat.',
        brochureButton: 'Brosúra letöltése',
        faster: 'Inkább most írna nekünk?',
        message: 'Jó napot kívánok! Most küldtem el az űrlapot a Spanyolrét Gardens oldalán.',
        back: 'Vissza a kezdőlapra',
        backHref: '/hu',
    },
};
