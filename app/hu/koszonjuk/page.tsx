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
        <main className="min-h-screen bg-gradient-to-b from-facade to-white flex items-center justify-center">
            <div className="section-container">
                <div className="max-w-xl mx-auto text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-anthracite mb-4">
                        Köszönjük!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Hamarosan jelentkezünk.
                    </p>
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <p className="text-gray-500 mb-4">Addig is töltsd le a brosúránkat:</p>
                        <a href="/Spanyolret-gardens.pdf" download>
                            <Button variant="accent" size="lg">
                                Brosúra letöltése
                            </Button>
                        </a>
                    </div>
                    <a href="/hu" className="text-gray-500 hover:text-gray-700 transition-colors text-sm underline">
                        &larr; Vissza a kezdőlapra
                    </a>
                </div>
            </div>
        </main>
    );
}
