import {
    CompressIcon,
    TreeIcon,
    CarIcon,
    MoneyIcon,
    ExpandIcon,
    PiggyBankIcon
} from '@/components/ui/Icons';
import { problems, solutions } from '@/lib/data';

export default function ProblemSolution() {
    const getProblemIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            compress: <CompressIcon size={32} />,
            'tree-slash': <TreeIcon size={32} />,
            'car-xmark': <CarIcon size={32} />,
            money: <MoneyIcon size={32} />
        };
        return icons[iconName] || null;
    };

    const getSolutionIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            expand: <ExpandIcon size={32} />,
            tree: <TreeIcon size={32} />,
            car: <CarIcon size={32} />,
            'piggy-bank': <PiggyBankIcon size={32} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="problem-solution" className="section-padding bg-white">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        Sound Familiar?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        You came to Budapest for opportunity. But somewhere along the way, your apartment
                        started feeling smaller, the parking worse, and the rent — pointless.
                    </p>
                </div>

                {/* Problems */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                {getProblemIcon(problem.icon)}
                            </div>
                            <h3 className="text-lg font-bold text-anthracite mb-2">{problem.title}</h3>
                            <p className="text-gray-600 text-sm">{problem.description}</p>
                        </div>
                    ))}
                </div>

                {/* Transition */}
                <div className="text-center py-8">
                    <div className="inline-flex items-center gap-4">
                        <div className="h-px w-12 bg-gray-300" />
                        <span className="text-2xl md:text-3xl font-display font-bold text-secondary">
                            There's a better way.
                        </span>
                        <div className="h-px w-12 bg-gray-300" />
                    </div>
                </div>

                {/* Solutions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                {getSolutionIcon(solution.icon)}
                            </div>
                            <h3 className="text-lg font-bold text-anthracite mb-2">{solution.title}</h3>
                            <p className="text-gray-600 text-sm">{solution.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
