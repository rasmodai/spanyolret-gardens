import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { CheckCircleIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
    title: 'Thank You | Spanyolrét Gardens',
    description: 'Thank you for your interest in Spanyolrét Gardens. We will contact you within 24 hours.',
    robots: { index: false, follow: false },
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-primary text-white flex items-center justify-center">
            <div className="section-container">
                <div className="max-w-xl mx-auto text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                        <CheckCircleIcon size={40} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Thank You!
                    </h1>
                    <p className="text-xl text-white/80 mb-8">
                        We&apos;ll contact you within 24 hours to schedule your consultation.
                    </p>
                    <div className="bg-white/10 rounded-xl p-6 mb-8">
                        <p className="text-white/70 mb-4">In the meantime, download our brochure:</p>
                        <a href="/Spanyolret-gardens.pdf" download>
                            <Button variant="accent" size="lg">
                                Download the Brochure
                            </Button>
                        </a>
                    </div>
                    <a href="/" className="text-white/60 hover:text-white transition-colors text-sm underline">
                        &larr; Back to homepage
                    </a>
                </div>
            </div>
        </main>
    );
}
