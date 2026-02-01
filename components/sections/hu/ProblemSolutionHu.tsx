'use client';

import { motion } from 'framer-motion';
import { problemsHu, solutionsHu, uiTextsHu } from '@/lib/data-hu';
import { CompressIcon, TreeSlashIcon, CarXmarkIcon, MoneyIcon, ExpandIcon, TreeIcon, CarIcon, PiggyBankIcon } from '@/components/ui/Icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function ProblemSolutionHu() {
    const t = uiTextsHu.problemSolution;

    const getIcon = (iconName: string, className: string) => {
        const icons: Record<string, React.ReactNode> = {
            compress: <CompressIcon size={24} className={className} />,
            'tree-slash': <TreeSlashIcon size={24} className={className} />,
            'car-xmark': <CarXmarkIcon size={24} className={className} />,
            money: <MoneyIcon size={24} className={className} />,
            expand: <ExpandIcon size={24} className={className} />,
            tree: <TreeIcon size={24} className={className} />,
            car: <CarIcon size={24} className={className} />,
            'piggy-bank': <PiggyBankIcon size={24} className={className} />
        };
        return icons[iconName] || null;
    };

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Problems */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded-full mb-4">
                                {t.problemTitle}
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            {problemsHu.map((problem, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-red-50/50 to-orange-50/30 border border-red-100/50"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                        {getIcon(problem.icon, 'text-red-500')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-anthracite mb-1">{problem.title}</h3>
                                        <p className="text-gray-600 text-sm">{problem.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <span className="inline-block px-4 py-1.5 bg-green-50 text-secondary text-sm font-semibold rounded-full mb-4">
                                {t.solutionTitle}
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            {solutionsHu.map((solution, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-green-50/50 to-emerald-50/30 border border-green-100/50"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                        {getIcon(solution.icon, 'text-secondary')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-anthracite mb-1">{solution.title}</h3>
                                        <p className="text-gray-600 text-sm">{solution.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
