// ============================================
// HUNGARIAN DATA - Idiomatic adaptation
// ============================================

import { Unit } from './data';

// Units data stays the same (numbers don't change)
export { units } from './data';

// ============================================
// TRUST BAR DATA
// ============================================

export const trustBarItemsHu = [
    { icon: 'building', value: '50+', label: 'Átadott projekt' },
    { icon: 'calendar', value: '13', label: 'Év tapasztalat' },
    { icon: 'shield', value: '100%', label: 'Határidőre kész' },
    { icon: 'award', value: 'Prémium', label: 'Alapanyagok' }
];

// ============================================
// PROBLEM-SOLUTION CONTENT
// ============================================

export const problemsHu = [
    {
        icon: 'compress',
        title: 'Kinőttétek a lakást',
        description: 'A gyerekek egy szobában. Home office az ágyból. Mindenhol játékok.'
    },
    {
        icon: 'tree-slash',
        title: 'Nincs kert',
        description: 'Az erkély kevés. A gyerekeknek kell a fű, a friss levegő, a hely a játékhoz.'
    },
    {
        icon: 'car-xmark',
        title: 'Parkolási rémálom',
        description: 'Körbejárni a blokkot. Utcai parkolás. Bevásárlás cipelése három utcáról.'
    },
    {
        icon: 'money',
        title: 'Az albérlet nem épít jövőt',
        description: 'Havi 500 ezer a főbérlőnek. Évi 6 millió, ami nem a tiéd lesz.'
    }
];

export const solutionsHu = [
    {
        icon: 'expand',
        title: '117 m² élettér',
        description: '5 szoba két szinten. Home office. Tárolók. Van hely lélegezni.'
    },
    {
        icon: 'tree',
        title: 'Akár 317 m² saját kert',
        description: 'Saját fű. Hétvégi grillezés. A gyerekek biztonságban játszanak kint.'
    },
    {
        icon: 'car',
        title: 'Saját parkoló',
        description: 'Hazaérsz. Távirányító. Beállsz. Minden egyes nap.'
    },
    {
        icon: 'piggy-bank',
        title: 'Valódi befektetés',
        description: 'Prémium ingatlan egy fejlődő piacon. Ne más jelzáloghitelét fizesd.'
    }
];

// ============================================
// PROPERTY OVERVIEW
// ============================================

export const propertyStatsHu = [
    { value: '6', label: 'Exkluzív sorház', icon: 'home' },
    { value: '117 m²', label: 'Belső élettér', icon: 'expand' },
    { value: '102-317 m²', label: 'Saját kertek', icon: 'tree' },
    { value: '220M Ft', label: 'Induló ár', icon: 'money' },
    { value: '5', label: 'Szoba lakásonként', icon: 'door' },
    { value: '2026. ősz', label: 'Kulcsrakész átadás', icon: 'calendar-check' }
];

// ============================================
// BENEFITS
// ============================================

export const benefitsHu = [
    {
        icon: 'heat',
        title: 'Hőszivattyús rendszer',
        description: 'Nincs gázszámla. Westen Auriga hőszivattyú padlófűtéssel és hűtéssel. A energiaosztály.',
        highlight: 'Évi 400 ezer+ spórolás'
    },
    {
        icon: 'soundproof',
        title: '30 cm-es hangszigetelés',
        description: 'Silka hangszigetelő tégla a lakások között. Nem hallod a szomszédot.',
        highlight: 'Nyugalom garantálva'
    },
    {
        icon: 'solar',
        title: 'Napelem-előkészítés',
        description: 'Előre kiépített vezetékek a tetőn. Felkészülve a jövőre.',
        highlight: 'Napelem-ready'
    },
    {
        icon: 'smart',
        title: 'Okos termosztátok',
        description: 'SIEMENS programozható termosztátok minden szinten. Beállítod és kész.',
        highlight: 'Zónánkénti szabályzás'
    },
    {
        icon: 'secure',
        title: 'Beépített biztonság',
        description: 'MABISZ-minősített bejárati ajtó. Riasztó-előkészítés minden szobában. Távirányítós kapu.',
        highlight: 'Családi biztonság'
    },
    {
        icon: 'customize',
        title: 'Személyre szabható',
        description: 'Válaszd ki a csempét, a padlót, a festék színét. Tedd magadévá mielőtt beköltözöl.',
        highlight: 'Te döntesz'
    },
    {
        icon: 'quality',
        title: 'Prémium alapanyagok',
        description: 'Wienerberger tégla. LEGRAND elektromos szerelvények. VEKA nyílászárók. Háromrétegű üvegezés.',
        highlight: 'Minőség ami tart'
    },
    {
        icon: 'garden',
        title: 'Saját kertek',
        description: '102 m²-től 317 m²-ig. Kézi vetésű fű. Öntözés-előkészítés. A te szabadtéri nappalid.',
        highlight: 'Akár 317 m²'
    }
];

// ============================================
// LOCATION
// ============================================

export const transportLinksHu = [
    { icon: 'metro', name: 'Kelenföld M4 metró', time: '6-8 perc busszal' },
    { icon: 'bus', name: '40, 40B, 88, 88A buszok', time: '10 perc séta' },
    { icon: 'car', name: 'Belváros', time: '15-20 perc autóval' },
    { icon: 'plane', name: 'Budapest reptér', time: '35 perc autóval' }
];

export const nearbyAmenitiesHu = [
    {
        category: 'Iskolák',
        items: ['Budapest Angol Iskola (15 perc)', 'Amerikai Nemzetközi Iskola (20 perc)', 'Helyi általános iskolák (5-10 perc)']
    },
    {
        category: 'Bevásárlás',
        items: ['Etele Plaza (10 perc)', 'IKEA Budaörs (15 perc)', 'Helyi boltok (5 perc séta)']
    },
    {
        category: 'Egészségügy',
        items: ['Szent Imre Kórház (10 perc)', 'Magánklinikák a közelben']
    },
    {
        category: 'Kikapcsolódás',
        items: ['Normafa túraútvonalak (15 perc)', 'Bikás Park (10 perc)', 'Duna-part (20 perc)']
    }
];

export const neighborhoodHighlightsHu = [
    'Csendes, családias utcák',
    'Alacsony forgalom',
    'Bejáratott családi környék',
    'Zöld környezet',
    'Nincs rivális új építés'
];

// ============================================
// DEVELOPER
// ============================================

export const developerStatsHu = [
    { value: '2012', label: 'Alapítva' },
    { value: '50+', label: 'Átadott projekt' },
    { value: '100%', label: 'Határidőre kész' },
    { value: '13', label: 'Év tapasztalat' }
];

export const qualityPromisesHu = [
    'Prémium európai alapanyagok (Wienerberger, LEGRAND, VEKA)',
    'Teljes kivitelezési garancia',
    'Átlátható árazás — nincsenek rejtett költségek',
    'Rendszeres építési tájékoztatók',
    'Személyes kapcsolattartó'
];

// ============================================
// TECHNICAL SPECIFICATIONS
// ============================================

export const specsCategoriesHu = [
    {
        id: 'structure',
        title: 'Szerkezet',
        items: [
            'Alap: Sávalap + 15 cm vasalt betonlemez',
            'Külső falak: 30 cm Wienerberger Porotherm (30%-os hőmegtakarítás)',
            'Válaszfalak: 30 cm Silka hangszigetelő tégla',
            'Hőszigetelés: 12 cm STO rendszer',
            'Tető: Lapos, zöldtető-előkészítés, 20-26 cm EPS szigetelés'
        ]
    },
    {
        id: 'climate',
        title: 'Fűtés és hűtés',
        items: [
            'Hőszivattyú: Westen Auriga melegvíz-tárolóval',
            'Elosztás: Padlófűtés az egész lakásban',
            'Hűtés: Fan-coil egységek minden szinten',
            'Vezérlés: SIEMENS/HONEYWELL okos termosztátok szintenként',
            'Opcionális: Mennyezeti fűtés-hűtés felár ellenében'
        ]
    },
    {
        id: 'windows',
        title: 'Nyílászárók',
        items: [
            'Ablakprofil: 6 kamrás VEKA 82 / Aluplast Neo',
            'Üvegezés: Háromrétegű',
            'Vasalat: Roto NX',
            'Bejárati ajtó: MABISZ-minősített, 4-8 pontos zár',
            'Árnyékolás: Redőny-előkészítés'
        ]
    },
    {
        id: 'electrical',
        title: 'Elektromos rendszer',
        items: [
            'Szerelvények: LEGRAND Valena sorozat',
            'Konnektorok: 4-10 db szobánként',
            'TV/Internet: Csatlakozás minden szobában',
            'Riasztó: Mozgásérzékelő-előkészítés minden szobában',
            'Kültéri világítás: Alkonykapcsolóval'
        ]
    },
    {
        id: 'finishes',
        title: 'Burkolatok és anyagok',
        items: [
            'Lakóterek: Prémium laminált padló',
            'Vizesblokkok: Kerámia burkolat (8.000 Ft/m²-ig)',
            'Falak: 2 réteg glett + 2-3 réteg festés (3 szín)',
            'Terasz: Porcelán kőlap (max 60×60 cm)',
            'Homlokzat: Dörzsölt nemesvakolat'
        ]
    },
    {
        id: 'outdoor',
        title: 'Kert és külső területek',
        items: [
            'Kertek: 10-15 cm humusz, kézi vetésű fű',
            'Járdák: KK-BETON London szürke térkő',
            'Kerítés: Horganyzott (utca), drótháló (telkek)',
            'Kapu: Távirányítós gépjármű-behajtó',
            'Öntözés: Előkészítés felár ellenében'
        ]
    }
];

// ============================================
// PRICING
// ============================================

export const includedInPriceHu = [
    'Kulcsrakész átadás (azonnal beköltözhető)',
    '1 saját parkolóhely',
    '6,6 m² terasz porcelán burkolattal',
    'Teljes kertépítés (fű, járda, kerítés)',
    'Minden elektromos és vízvezeték-szerelvény',
    'LEGRAND kapcsolók és konnektorok',
    'Padlófűtési rendszer',
    'Fan-coil hűtőegységek'
];

export const optionalExtrasHu = [
    { item: 'További parkolóhely', price: '4.000.000 Ft' },
    { item: 'Mennyezeti fűtés-hűtés', price: 'Egyedi árajánlat' },
    { item: 'Motoros redőny', price: 'Egyedi árajánlat' },
    { item: 'Napelem telepítés', price: 'Egyedi árajánlat' },
    { item: 'Kerti öntözőrendszer', price: 'Egyedi árajánlat' }
];

// ============================================
// PURCHASE PROCESS
// ============================================

export const processStepsHu = [
    {
        step: 1,
        title: 'Egyeztetés',
        description: 'Beszéljük át az igényeidet és válaszoljunk a kérdéseidre.',
        duration: '30 perc',
        icon: 'calendar'
    },
    {
        step: 2,
        title: 'Helyszíni látogatás',
        description: 'Nézd meg az építkezést, a környéket, képzeld el a jövőbeli otthonod.',
        duration: '1 óra',
        icon: 'map-marker'
    },
    {
        step: 3,
        title: 'Lakás kiválasztása',
        description: 'Válassz az elérhető lakások közül. Beszéljük át a burkolási lehetőségeket.',
        duration: 'A te tempódban',
        icon: 'home'
    },
    {
        step: 4,
        title: 'Foglalás',
        description: 'Foglaló befizetésével biztosítsd a lakást. Részletes szerződés.',
        duration: '1-2 hét',
        icon: 'file'
    },
    {
        step: 5,
        title: 'Adásvételi szerződés',
        description: 'Szerződéskötés közjegyzőnél. Végigvezetünk minden lépésen.',
        duration: '2-4 hét',
        icon: 'check-circle'
    },
    {
        step: 6,
        title: 'Beköltözés (2026 ősz)',
        description: 'Megkapod a kulcsokat a kulcsrakész, azonnal beköltözhető otthonodhoz.',
        duration: 'Átadás napja',
        icon: 'key'
    }
];

export const processReassuranceHu = [
    'Személyes kapcsolattartó',
    'Részletes, érthető szerződések',
    'Javasolt ügyvédek és közjegyzők',
    'Rendszeres építési tájékoztatók',
    'Átlátható kommunikáció végig'
];

// ============================================
// FAQ
// ============================================

export const faqsHu = [
    {
        category: 'Vásárlási folyamat',
        questions: [
            {
                q: 'Milyen a fizetési ütemezés?',
                a: 'Általában: 10% foglaló, majd ütemezett részletek az építkezés alatt, végső részlet átadáskor. A pontos feltételeket az egyeztetésen beszéljük át, és az egyéni helyzetedhez igazítjuk.'
            },
            {
                q: 'Lehet hitelből vásárolni?',
                a: 'Igen, több bank is kínál lakáshitelt új építésű ingatlanokra. Szívesen ajánlunk hiteltanácsadókat, akik segítenek a legjobb konstrukció megtalálásában.'
            },
            {
                q: 'Mi történik, ha csúszik az építkezés?',
                a: 'Az S-Patrik Bau 50+ projektnél 100%-os határidő-tartással büszkélkedhet. A szerződés tartalmazza a késedelmi feltételeket is, védve az érdekeidet.'
            },
            {
                q: 'Kell ügyvéd a vásárláshoz?',
                a: 'Ajánlott, de nem kötelező. Szívesen ajánlunk megbízható ügyvédeket, akik már ismerik a projektet és gördülékenyen intézik az ügyeket.'
            }
        ]
    },
    {
        category: 'Az ingatlan',
        questions: [
            {
                q: 'Lehet módosítani a burkolatokat?',
                a: 'Igen! A befejező munkák előtt választhatsz csempét, padlót, festékszínt (3 szín az árban). A saját ízlésedre szabhatod, mielőtt beköltözöl.'
            },
            {
                q: 'Mi van benne az árban?',
                a: 'Kulcsrakész átadás: padló, fürdőszobai szerelvények, konyha-előkészítés, világítás, fűtés-hűtés, rendezett kert. Csak beköltözni kell.'
            },
            {
                q: 'Vannak havi költségek?',
                a: 'Minimális közös költség (közös útfelület, kukás). Nincs társasházi közös költség, mint a lakásoknál. A rezsi a tiéd.'
            },
            {
                q: 'Milyen garanciát kapok?',
                a: 'Teljes kivitelezési garancia a törvényi előírások szerint, plusz gyártói garancia minden beépített rendszerre (hőszivattyú, nyílászárók stb.). Az S-Patrik Bau átadás után is elérhető.'
            }
        ]
    },
    {
        category: 'Környék és életmód',
        questions: [
            {
                q: 'Milyen messze van a belváros?',
                a: 'Kb. 20-25 perc autóval vagy tömegközlekedéssel. A Kelenföld M4 metró 6-8 perc busszal, onnan közvetlen a központba. Tér és nyugalom, de nem vagy messze.'
            },
            {
                q: 'Vannak jó iskolák a közelben?',
                a: 'Igen. Helyi általános iskolák 5-10 percre. Nemzetközi iskolák (brit, amerikai) 15-20 percre. Középiskolák is elérhetők a környéken.'
            },
            {
                q: 'Biztonságos a környék?',
                a: 'Nagyon. A Spanyolrét bejáratott családi környék, alacsony bűnözéssel. Csendes, családbarát, jó a közösségi szellem.'
            },
            {
                q: 'Hány parkoló jár?',
                a: 'Minden lakáshoz 1 saját parkoló. További hely vásárolható 4 millió Ft-ért. Távirányítós kapu. Vége az utcai parkolásnak.'
            }
        ]
    },
    {
        category: 'Műszaki kérdések',
        questions: [
            {
                q: 'Mennyire energiatakarékos?',
                a: 'Nagyon. Hőszivattyús fűtés-hűtés (nincs gáz), 30 cm szigetelt falak, háromrétegű ablakok, padlófűtés. Számíts jóval alacsonyabb rezsire, mint egy régebbi ingatlannál.'
            },
            {
                q: 'Lehet napelemet telepíteni?',
                a: 'Igen, minden lakás napelem-ready, a védőcsövek már ki vannak építve. Telepíthető építés közben vagy átadás után is.'
            },
            {
                q: 'Van klíma?',
                a: 'Fan-coil hűtőegységek minden szinten. Opcionálisan mennyezeti fűtés-hűtésre is váltható, ami feleslegessé teszi a külső klímát.'
            },
            {
                q: 'Van öntözőrendszer a kertben?',
                a: 'Öntözés-előkészítés opcionálisan kérhető. A kert humuszolva és kézi vetésű fűvel átadva.'
            }
        ]
    }
];

// ============================================
// UI TEXTS
// ============================================

export const uiTextsHu = {
    hero: {
        badge: 'Foglalás nyitva • Csak 6 lakás',
        headline: 'Családod saját kertje',
        headlineHighlight: 'vár rád Budapesten',
        subheadline: 'Prémium társasházak Spanyolréten, akár 317 m² saját kerttel, padlófűtéssel és saját parkolóval.',
        priceLabel: 'Már',
        priceValue: '220 millió Ft-tól',
        ctaPrimary: 'Időpont egyeztetés',
        ctaSecondary: 'Alaprajzok megtekintése',
        stats: [
            { value: '6', label: 'Exkluzív lakás' },
            { value: '117 m²', label: 'Belső tér' },
            { value: '317 m²', label: 'Max. kert' },
            { value: '2026 ősz', label: 'Átadás' }
        ]
    },
    problemSolution: {
        problemTitle: 'Ismered ezt?',
        solutionTitle: 'Itt a megoldás'
    },
    propertyOverview: {
        badge: 'ÁTTEKINTÉS',
        title: 'Spanyolrét Gardens',
        subtitle: '6 exkluzív új építésű sorház Budapest XI. kerületében — saját kerttel, modern technológiával és csendes környékkel.'
    },
    gallery: {
        badge: 'A jövőbeli életérzés',
        title: 'Ismerd meg a',
        titleHighlight: 'Spanyolrét Gardens-t',
        subtitle: 'Fedezd fel az életstílust, ami Budapest legújabb prémium beruházásában vár rád'
    },
    benefits: {
        badge: 'MIÉRT ÉRDEMES',
        title: 'Minőség minden részletben',
        subtitle: 'A Spanyolrét Gardens minden eleme a kényelmes, energiatakarékos családi életet szolgálja.'
    },
    floorPlans: {
        badge: 'ALAPRAJZOK',
        title: 'Válaszd ki a tökéletes lakást',
        subtitle: '6 egyedi otthon, azonos prémium minőség. Már 220 millió Ft-tól.',
        sitePlan: '📍 Helyszínrajz',
        buildingA: '🏠 A épület',
        buildingB: '🏠 B épület',
        groundFloor: 'Földszint',
        firstFloor: 'Emelet',
        allUnits: 'Összes lakás',
        comparison: 'Gyors összehasonlítás',
        internalArea: 'Belső terület',
        garden: 'Kert',
        rooms: 'Szobák',
        status: 'Státusz',
        available: 'Elérhető',
        reserved: 'Foglalt',
        sold: 'Elkelt',
        requestDetails: 'Részletek kérése',
        noLongerAvailable: 'Már nem elérhető',
        comparisonNote: 'Minden lakáshoz 6,60 m² terasz és 1 parkoló tartozik. Részletekért keressen minket.'
    },
    location: {
        badge: 'ELHELYEZKEDÉS',
        title: 'Tökéletes lokáció',
        subtitle: 'A legjobb mindkét világból: városi elérhetőség vidéki nyugalommal. Kapcsolat a várossal, mégis csend.',
        address: 'Cím',
        gettingAround: 'Közlekedés',
        neighborhood: 'A környék',
        nearbyAmenities: 'Szolgáltatások a közelben',
        openInMaps: 'Megnyitás térképen'
    },
    developer: {
        badge: 'KIVITELEZŐ',
        title: 'Építi: S-Patrik Bau',
        subtitle: '13 év prémium építés Budapesten',
        description: 'Az S-Patrik Bau 2012 óta épít prémium lakóingatlanokat Budapesten. Több mint 50 átadott projekttel a minőségi kivitelezés, prémium alapanyagok és határidőre történő átadás a védjegyünk. Minden Spanyolrét Gardens otthon ugyanazzal a gondossággal épül, ami Budapest egyik legmegbízhatóbb kivitelezőjévé tett minket.',
        promise: 'Amit ígérünk'
    },
    specs: {
        badge: 'MŰSZAKI ADATOK',
        title: 'Prémium a részletekben',
        subtitle: 'Minden döntésünk mögött a tartósság, kényelem és energiatakarékosság áll.'
    },
    process: {
        badge: 'A VÁSÁRLÁS MENETE',
        title: 'Egyszerű, átlátható folyamat',
        subtitle: 'Hat lépés a kulcsátvételig — végig támogatunk.',
        reassuranceTitle: 'Végig melletted vagyunk'
    },
    faq: {
        badge: 'GYAKORI KÉRDÉSEK',
        title: 'Minden, amit tudni akarsz',
        subtitle: 'Amit a Spanyolrét Gardens vásárlásáról tudni érdemes.'
    },
    leadForm: {
        badge: 'KAPCSOLATFELVÉTEL',
        title: 'Beszéljünk',
        subtitle: 'Töltsd ki az űrlapot és felvesszük veled a kapcsolatot 24 órán belül.',
        firstName: 'Keresztnév',
        lastName: 'Vezetéknév',
        email: 'E-mail cím',
        phone: 'Telefonszám',
        preferredContact: 'Hogyan keressünk?',
        contactEmail: 'E-mail',
        contactPhone: 'Telefon',
        contactWhatsapp: 'WhatsApp',
        timeline: 'Mikor szeretnél vásárolni?',
        timelineAsap: 'Minél előbb',
        timeline6months: '6 hónapon belül',
        timeline12months: '12 hónapon belül',
        timelineJustLooking: 'Még csak tájékozódom',
        message: 'Üzenet (opcionális)',
        messagePlaceholder: 'Kérdésed van? Szeretnél konkrét lakásról érdeklődni?',
        consent: 'Hozzájárulok, hogy a Spanyolrét Gardens-ről marketing célú megkereséseket kapjak',
        submit: 'Küldés',
        privacy: 'Az adataidat biztonságosan kezeljük és kizárólag a Spanyolrét Gardens kapcsán használjuk.',
        thankYou: 'Köszönjük!',
        thankYouMessage: 'Hamarosan jelentkezünk.'
    },
    footer: {
        tagline: 'Prémium sorházak saját kerttel Budapest XI. kerületében',
        contact: 'Kapcsolat',
        quickLinks: 'Gyors linkek',
        developer: 'Kivitelező',
        connect: 'Kövess minket',
        verifiedDeveloper: 'Ellenőrzött kivitelező',
        licensedInsured: 'Engedélyes és biztosított',
        copyright: '© 2025 S-Patrik Bau Kft. Minden jog fenntartva.',
        privacy: 'Adatvédelem',
        cookies: 'Cookie szabályzat',
        terms: 'ÁSZF'
    },
    navbar: {
        overview: 'Áttekintés',
        gallery: 'Galéria',
        floorPlans: 'Alaprajzok',
        location: 'Lokáció',
        contact: 'Kapcsolat',
        requestViewing: 'Időpont kérés'
    },
    common: {
        learnMore: 'Tudj meg többet',
        viewDetails: 'Részletek',
        scrollDown: 'Görgess',
        pinchToZoom: 'Csípéssel nagyítható',
        swipeToExplore: 'Húzd oldalra'
    }
};
