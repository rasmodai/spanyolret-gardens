// ============================================
// HUNGARIAN DATA - Idiomatic adaptation
// ============================================

import { Unit } from './data';

// Units data stays the same (numbers don't change)
export { units } from './data';

// Nor does the address: Törökbálinti út is Törökbálinti út in both languages.
export { siteAddress, mapEmbedSrc, mapLinkHref } from './data';

// ============================================
// TRUST BAR DATA
// ============================================

export const trustBarItemsHu = [
    { icon: 'building', value: '50+', label: 'Átadott projekt' },
    // Az alapítás évéből számolva, nem beégetve.
    { icon: 'calendar', value: `${new Date().getFullYear() - 2012}`, label: 'Éve építünk' },
    // ⚠️ NEM ELLENŐRIZHETŐ — lásd developerStatsHu.
    { icon: 'shield', value: '100%', label: 'Határidőre kész' },
    { icon: 'award', value: '30 cm', label: 'Válaszfalak' }
];

// ============================================
// PROBLEM-SOLUTION CONTENT
// ============================================

export const problemsHu = [
    {
        icon: 'compress',
        title: 'Az iroda a hálószoba sarka',
        description: 'Mindig telefonál valaki. És mindig kérnek meg valaki mást, hogy legyen csendben.'
    },
    {
        icon: 'tree-slash',
        title: 'Az erkély nem a szabad ég alatt van',
        description: 'Egy ötévest nem küldesz ki az erkélyre, hogy közben elintézd a délelőttöt.'
    },
    {
        icon: 'car-xmark',
        title: 'Húsz perc parkolóhelyet keresni',
        description: 'Utána három utca gyalog, a bevásárlással és mindkét gyerekkel.'
    },
    {
        icon: 'money',
        title: 'Évi 6 millió, és egyik forint sem a tiéd',
        description: 'Havi 500 ezerrel egy ház jó részét kifizetted. Csak nem a tiédet.'
    }
];

export const solutionsHu = [
    {
        icon: 'expand',
        title: '117 m², öt szoba, két szint',
        description: 'Egy szoba, ahol dolgozni lehet, becsukható ajtóval. Kamra, háztartási helyiség, gardrób.'
    },
    {
        icon: 'tree',
        title: '102 és 316,84 m² közötti kert',
        description: 'Kézi vetésű fű, körbekerítve, a nappaliból nyíló ajtóval. A teraszról az egészet belátod.'
    },
    {
        icon: 'car',
        title: 'Egy hely, kapu mögött, amit az autóból nyitsz',
        description: 'Megérkezel, a kapu kinyílik, beállsz. Ennyi az egész, minden nap.'
    },
    {
        icon: 'piggy-bank',
        title: 'A törlesztés olyanba megy, ami a tiéd',
        description: 'Nem fogunk a budapesti piacról jóslatot mondani. De a pénz nem megy el többé.'
    }
];

// ============================================
// PROPERTY OVERVIEW
// ============================================

export const propertyStatsHu = [
    { value: '6', label: 'Sorház', icon: 'home' },
    { value: '117–120 m²', label: 'Belső tér', icon: 'expand' },
    { value: '102–317 m²', label: 'Saját kert', icon: 'tree' },
    { value: '5', label: 'Szoba', icon: 'door' },
    { value: '6,60 m²', label: 'Terasz', icon: 'money' },
    { value: '2026. szeptember', label: 'Kulcsátadás', icon: 'calendar-check' }
];

// ============================================
// BENEFITS
// ============================================

export const benefitsHu = [
    {
        icon: 'heat',
        // "A energiaosztály" és "Évi 400 ezer+ spórolás" törölve: egyik sem
        // szerepel a műszaki leírásban. Energetikai tanúsítvány és tényleges
        // fogyasztási adatok nélkül nem kerülnek vissza.
        title: 'Nincs gázszámla, mert nincs gáz',
        description: 'Egy Westen Auriga hőszivattyú viszi télen a padlófűtést, nyáron a hűtést.',
        highlight: 'Nincs gázbekötés'
    },
    {
        icon: 'soundproof',
        title: '30 cm tégla a szomszéd és közted',
        description: 'Silka hangszigetelő blokk a válaszfalakban. Ezért nem fogod hallani őket.',
        highlight: '30 cm'
    },
    {
        icon: 'solar',
        title: 'A napelem vezetékei már a helyükön',
        description: 'Védőcső fut a tetőig. Maga a napelem külön díjazású extra, nincs benne az árban.',
        highlight: 'Védőcső kiépítve'
    },
    {
        icon: 'smart',
        title: 'Szintenként egy termosztát',
        description: 'Heti programozású, SIEMENS vagy HONEYWELL. A földszintnek és az emeletnek nem kell egyetértenie.',
        highlight: 'Szintenként'
    },
    {
        icon: 'secure',
        title: 'MABISZ-minősített bejárati ajtó',
        description: 'Négy-nyolc pontos zárás, riasztó-előkészítés minden szobában, és egy kapu, amit az autóból nyitsz.',
        highlight: 'Minősített'
    },
    {
        icon: 'customize',
        title: 'A burkolatokat még építés közben választod',
        description: 'Csempe, padló, festés. Ezt az egyet nem tudod megtenni, ha kész házat veszel.',
        highlight: 'Átadásig'
    },
    {
        icon: 'quality',
        title: 'A műszaki leírás, írásban',
        description: 'Kívül Wienerberger Porotherm, közte Silka, LEGRAND Valena szerelvények, háromrétegű üvegezés. A megnevezett márka olyan állítás, amin számon kérhetsz minket.',
        highlight: 'Megnevezve, nem sugallva'
    },
    {
        icon: 'garden',
        title: 'A kert az egész lényege',
        description: '102,12 m²-től 316,84 m²-ig. Kézi vetésű fű, 10–15 cm humusz, öntözés-előkészítés.',
        highlight: 'Akár 316,84 m²'
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
    { value: '2012', label: 'Építünk azóta' },
    { value: '50+', label: 'Átadott projekt' },
    // ⚠️ NEM ELLENŐRIZHETŐ — a "100% határidőre" sehol nem szerepel a műszaki
    // dokumentációban, marketingszövegből ered. Írásos megerősítés vagy törlés.
    { value: '100%', label: 'Határidőre kész' },
    // Az alapítás évéből számolva. Ne legyen beégetve: a korábbi '13' 2025
    // decemberében készült, és 2026 augusztusára már téves volt.
    { value: `${new Date().getFullYear() - 2012}`, label: 'Éve építünk' }
];

export const qualityPromisesHu = [
    'A teljes műszaki leírás írásban, mielőtt bármire elköteleződsz',
    'Törvény szerinti szerkezeti garancia, plusz gyártói garanciák',
    // Volt: "Átlátható árazás — nincsenek rejtett költségek". Ez már nem áll,
    // mert az extrák külön díjazásúak. Ez ugyanannak az ígéretnek az őszinte formája.
    'Minden külön díjazású extra előre listázva, nem a szerződésnél derül ki',
    'Rendszeres tájékoztatás az építkezés haladásáról',
    'Egy angolul beszélő kapcsolattartó, végig ugyanaz',
    'Átadott projektjeink címei, hogy a kivitelezést magad nézhesd meg'
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
            'Vizesblokkok: Kerámia burkolat (8 000 Ft/m²-ig)',
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
    { item: 'További parkolóhely', price: '4 000 000 Ft' },
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
        title: 'Beköltözés (2026. szeptember)',
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
                a: 'Minden lakáshoz 1 saját parkoló. További hely vásárolható 4 000 000 Ft-ért. Távirányítós kapu. Vége az utcai parkolásnak.'
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
        // Mirrors the English hero. 'vár rád' (awaits) is gone: PRD §7.0 bans
        // verbs of longing in both languages.
        headline: 'Saját kert.',
        headlineSecond: 'Nem erkély.',
        subheadline: 'Hat sorház Budapest XI. kerületében, két épületben. Öt szoba két szinten, és egy kert, ami 102-től 317 m²-ig terjed.',
        priceValue: '242 050 000 Ft-tól',
        priceQualifier:
            'Kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban — 2026. szeptember 30-ig beérkező foglaló esetén',
        ctaPrimary: 'Időpontot kérek',
        ctaSecondary: 'A hat kert',
        location: 'Budapest XI. · 2026. szeptember',
        stats: [
            { value: '6', label: 'Sorház' },
            { value: '117–120 m²', label: 'Belső tér' },
            { value: '102–317 m²', label: 'Saját kert' },
            { value: '2026. szeptember', label: 'Kulcsátadás' }
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
        title: 'Hatszor ugyanaz a ház. A kert az, ami változik.',
        subtitle: 'Hatszor ugyanaz a ház: öt szoba, két szint, 6,60 m² terasz. A kert az, ami változik — 102,12 m²-től 316,84 m²-ig, több mint háromszoros különbség.',
        sitePlan: 'Helyszínrajz',
        buildingA: 'A épület',
        buildingB: 'B épület',
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
        // Volt: 'Tökéletes lokáció' / 'A legjobb mindkét világból' — mindkettő
        // tiltott a PRD §7.0 szerint. Az új verzió elismeri a kompromisszumot,
        // és ettől lesz hihető a többi.
        title: 'Húsz perc a belvárostól. A zajból semmi.',
        subtitle: 'Spanyolrét nem belváros, és nem is teszünk úgy, mintha az lenne. Amit a plusz tizenöt percért kapsz, az egy utca, ahol nem történik semmi.',
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
