import PrivacyPolicy from '@/components/PrivacyPolicy';
import { privacyMetadata } from '@/lib/metadata';

export const metadata = privacyMetadata('hu');

export default function AdatvedelemPage() {
    return <PrivacyPolicy locale="hu" />;
}
