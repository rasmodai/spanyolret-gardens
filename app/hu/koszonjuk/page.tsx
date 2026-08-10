import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { CheckCircleIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
    title: 'Köszönjük | Spanyolrét Gardens',
    description: 'Köszönjük érdeklődését a Spanyolrét Gardens iránt. Hamarosan jelentkezünk.',
    robots: { index: false, follow: false },
};

export default function KoszonjukPage() {
    return (
        <main className="min-h-screen bg-paper-deep flex items-center justify-center">
            <div className="section-container">
                <div className="max-w-xl mx-auto text-center py-16">
                    <div className="w-20 h-20 bg-paper-deep rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon size={40} className="text-paper" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-anthracite mb-4">
                        Köszönjük!
                    </h1>
                    <p className="text-lg text-ink-soft mb-8">
                        Hamarosan jelentkezünk.
                    </p>
                    <div className="bg-paper rounded-xl shadow-md p-6 mb-8">
                        <p className="text-ink-soft mb-4">Addig is töltsd le a brosúránkat:</p>
                        <a href="/Spanyolret-gardens.pdf" download>
                            <Button variant="accent" size="lg">
                                Brosúra letöltése
                            </Button>
                        </a>
                    </div>
                    <a href="/hu" className="text-ink-soft hover:text-ink-soft transition-colors text-sm underline">
                        &larr; Vissza a kezdőlapra
                    </a>
                </div>
            </div>
        </main>
    );
}
