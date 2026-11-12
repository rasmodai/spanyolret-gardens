import PrivacyPolicy from '@/components/PrivacyPolicy';
import { privacyMetadata } from '@/lib/metadata';

export const metadata = privacyMetadata('en');

export default function PrivacyPage() {
    return <PrivacyPolicy locale="en" />;
}
