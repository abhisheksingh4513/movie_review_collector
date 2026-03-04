'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { SentimentResult } from '@/types/movie';

interface ReviewSummaryProps {
    sentiment: SentimentResult;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function ReviewSummary({ sentiment }: ReviewSummaryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
        >
            {/* AI Summary */}
            <div className="relative">
                <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full" />
                <blockquote className="pl-6 py-1">
                    <p className="text-gray-200 text-lg leading-relaxed italic">
                        &ldquo;{sentiment.summary}&rdquo;
                    </p>
                </blockquote>
            </div>

            {/* Key Points */}
            {sentiment.keyPoints && sentiment.keyPoints.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
                    <motion.ul
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {sentiment.keyPoints.map((point, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                className="flex items-start gap-3 bg-gray-800/40 rounded-xl p-4 border border-gray-700/50"
                            >
                                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{point}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            )}

            {/* Powered by badge */}
            <div className="flex items-center gap-2 pt-4">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-gray-500 text-sm">Powered by Google Gemini AI</span>
            </div>
        </motion.div>
    );
}
