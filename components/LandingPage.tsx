import StickyActions from '@/components/StickyActions';
import CtaBand from '@/components/sections/CtaBand';
import Developer from '@/components/sections/Developer';
import FAQ from '@/components/sections/FAQ';
import FloorPlans from '@/components/sections/FloorPlans';
import Footer from '@/components/sections/Footer';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import LeadForm from '@/components/sections/LeadForm';
import Location from '@/components/sections/Location';
import Navbar from '@/components/sections/Navbar';
import Pricing from '@/components/sections/Pricing';
import Process from '@/components/sections/Process';
import Specs from '@/components/sections/Specs';
import WhyHere from '@/components/sections/WhyHere';
import { getCopy } from '@/lib/copy';
import type { Locale } from '@/lib/format';
import { houseOptions, houseRows } from '@/lib/houses-view';
import { projectConfig } from '@/lib/project-config';

/* One tree for both languages, fed by lib/copy/en.ts and lib/copy/hu.ts, so a
 * change cannot land in one language only. A server component: the sections
 * that need the browser (navbar, plan viewer, form, FAQ…) are client components
 * that only ever receive plain strings, never lib/data.ts.
 *
 * Hyphenation of Hungarian compounds (Kulcsrakész, Hőszivattyús) is inherited
 * from the wrapper; the `lang="hu"` it needs is on app/hu/layout.tsx. */
export default function LandingPage({ locale }: { locale: Locale }) {
    const copy = getCopy(locale);
    const { nav } = copy;
    const messaging = projectConfig.whatsappNumber !== null;

    return (
        <main className={locale === 'hu' ? 'wrap-compound' : undefined}>
            <Navbar
                ariaLabel={nav.ariaLabel}
                backToTop={nav.backToTop}
                links={nav.links}
                cta={nav.cta}
                themeDark={nav.themeDark}
                themeLight={nav.themeLight}
            />
            <Hero copy={copy} />
            <WhyHere copy={copy} />
            <Gallery copy={copy} />
            <FloorPlans copy={copy} locale={locale} houses={houseRows(locale)} />
            <CtaBand id="after-houses" messaging={messaging} {...copy.ctaBands.afterHouses} />
            <Pricing copy={copy} />
            <Location copy={copy} locale={locale} />
            <Developer copy={copy} />
            <Specs copy={copy} />
            <CtaBand id="after-specs" messaging={messaging} {...copy.ctaBands.afterSpecs} />
            <Process copy={copy} />
            <FAQ {...copy.faq} />
            <LeadForm copy={copy} locale={locale} unitOptions={houseOptions(locale)} />
            <Footer copy={copy} locale={locale} />
            <StickyActions copy={copy.stickyBar} messaging={messaging} phone={projectConfig.callNumber} />
        </main>
    );
}
