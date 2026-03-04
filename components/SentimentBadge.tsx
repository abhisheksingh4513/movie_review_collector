'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SentimentBadgeProps {
    classification: 'positive' | 'mixed' | 'negative';
    score: number;
}

const config = {
    positive: {
        gradient: 'from-emerald-600 to-green-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        barColor: 'bg-gradient-to-r from-emerald-500 to-green-400',
        emoji: '😊',
        label: 'Positive',
    },
    mixed: {
        gradient: 'from-amber-600 to-yellow-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        barColor: 'bg-gradient-to-r from-amber-500 to-yellow-400',
        emoji: '😐',
        label: 'Mixed',
    },
    negative: {
        gradient: 'from-red-600 to-rose-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        barColor: 'bg-gradient-to-r from-red-500 to-rose-400',
        emoji: '😞',
        label: 'Negative',
    },
};

export default function SentimentBadge({ classification, score }: SentimentBadgeProps) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const c = config[classification];

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = score / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.round(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [score]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl border ${c.border} ${c.bg} p-6 md:p-8`}
            id="sentiment-badge"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-4xl"
                    >
                        {c.emoji}
                    </motion.span>
                    <div>
                        <p className={`text-lg font-bold ${c.text}`}>{c.label} Sentiment</p>
                        <p className="text-gray-400 text-sm">AI-powered analysis</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`text-4xl font-bold ${c.text}`} data-testid="sentiment-score">
                        {animatedScore}
                    </p>
                    <p className="text-gray-500 text-xs">out of 100</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${c.barColor}`}
                />
            </div>
        </motion.div>
    );
}
