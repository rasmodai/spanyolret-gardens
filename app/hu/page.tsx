import LandingPage from '@/components/LandingPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('hu');

export default function HomeHu() {
    return <LandingPage locale="hu" />;
}
