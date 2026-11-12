import type { Metadata } from 'next';
import ThankYou from '@/components/ThankYou';
import { getCopy } from '@/lib/copy';

export const metadata: Metadata = {
    title: getCopy('hu').thankYou.metaTitle,
    robots: { index: false, follow: false },
};

export default function KoszonjukPage() {
    return <ThankYou locale="hu" />;
}
