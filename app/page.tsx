import Hero from '@/components/sections/Hero';
import Navbar from '@/components/sections/Navbar';
import TrustBar from '@/components/sections/TrustBar';
import ProblemSolution from '@/components/sections/ProblemSolution';
import PropertyOverview from '@/components/sections/PropertyOverview';
import Gallery from '@/components/sections/Gallery';
import Benefits from '@/components/sections/Benefits';
import FloorPlans from '@/components/sections/FloorPlans';
import Location from '@/components/sections/Location';
import Developer from '@/components/sections/Developer';
import Specs from '@/components/sections/Specs';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import LeadForm from '@/components/sections/LeadForm';
import Footer from '@/components/sections/Footer';
import FloatingBadge from '@/components/ui/FloatingBadge';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Home() {
    return (
        <main>
            <Navbar />
            <FloatingBadge availableUnits={4} totalUnits={6} />
            <Hero />
            <TrustBar />
            <SectionDivider variant="gradient" />
            <ProblemSolution />
            <PropertyOverview />
            <SectionDivider variant="accent" />
            <Gallery />
            <Benefits />
            <SectionDivider variant="gradient" />
            <FloorPlans />
            <Location />
            <SectionDivider variant="accent" />
            <Developer />
            <Specs />
            <SectionDivider variant="gradient" />
            <Process />
            <FAQ />
            <LeadForm />
            <Footer />
        </main>
    );
}
