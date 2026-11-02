import type { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { privacyCopy } from '@/lib/privacy-copy';

export const metadata: Metadata = { title: privacyCopy.hu.metaTitle };

export default function AdatvedelemPage() {
    return <PrivacyPolicy locale="hu" />;
}
