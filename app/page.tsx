import LandingPage from '@/components/LandingPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('en');

export default function Home() {
    return <LandingPage locale="en" />;
}
