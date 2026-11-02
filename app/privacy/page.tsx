import type { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { privacyCopy } from '@/lib/privacy-copy';

export const metadata: Metadata = { title: privacyCopy.en.metaTitle };

export default function PrivacyPage() {
    return <PrivacyPolicy locale="en" />;
}
