import HeroHu from '@/components/sections/hu/HeroHu';
import NavbarHu from '@/components/sections/hu/NavbarHu';
import TrustBarHu from '@/components/sections/hu/TrustBarHu';
import ProblemSolutionHu from '@/components/sections/hu/ProblemSolutionHu';
import PropertyOverviewHu from '@/components/sections/hu/PropertyOverviewHu';
import GalleryHu from '@/components/sections/hu/GalleryHu';
import BenefitsHu from '@/components/sections/hu/BenefitsHu';
import FloorPlansHu from '@/components/sections/hu/FloorPlansHu';
import LocationHu from '@/components/sections/hu/LocationHu';
import DeveloperHu from '@/components/sections/hu/DeveloperHu';
import SpecsHu from '@/components/sections/hu/SpecsHu';
import ProcessHu from '@/components/sections/hu/ProcessHu';
import FAQHu from '@/components/sections/hu/FAQHu';
import LeadFormHu from '@/components/sections/hu/LeadFormHu';
import FooterHu from '@/components/sections/hu/FooterHu';
import FloatingBadge from '@/components/ui/FloatingBadge';
import SectionDivider from '@/components/ui/SectionDivider';

export default function HomeHu() {
    return (
        <main>
            <NavbarHu />
            <FloatingBadge availableUnits={4} totalUnits={6} />
            <HeroHu />
            <TrustBarHu />
            <SectionDivider variant="gradient" />
            <ProblemSolutionHu />
            <PropertyOverviewHu />
            <SectionDivider variant="accent" />
            <GalleryHu />
            <BenefitsHu />
            <SectionDivider variant="gradient" />
            <FloorPlansHu />
            <LocationHu />
            <SectionDivider variant="accent" />
            <DeveloperHu />
            <SpecsHu />
            <SectionDivider variant="gradient" />
            <ProcessHu />
            <FAQHu />
            <LeadFormHu />
            <FooterHu />
        </main>
    );
}
