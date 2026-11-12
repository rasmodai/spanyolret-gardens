import type { Metadata } from 'next';
import ThankYou from '@/components/ThankYou';
import { getCopy } from '@/lib/copy';

export const metadata: Metadata = {
    title: getCopy('en').thankYou.metaTitle,
    robots: { index: false, follow: false },
};

export default function ThankYouPage() {
    return <ThankYou locale="en" />;
}
