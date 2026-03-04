'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const loadingMessages = [
    'Fetching movie details...',
    'Gathering audience reviews...',
    'Analyzing sentiment with AI...',
];

export default function LoadingScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
            {/* Animated clapperboard */}
            <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mb-8"
            >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="25" width="60" height="45" rx="4" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
                    <rect x="10" y="15" width="60" height="15" rx="2" fill="#3b82f6" />
                    <line x1="25" y1="15" x2="20" y2="30" stroke="#030712" strokeWidth="2" />
                    <line x1="40" y1="15" x2="35" y2="30" stroke="#030712" strokeWidth="2" />
                    <line x1="55" y1="15" x2="50" y2="30" stroke="#030712" strokeWidth="2" />
                    <circle cx="40" cy="47" r="10" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="47" r="4" fill="#3b82f6" />
                </svg>
            </motion.div>

            {/* Loading message */}
            <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400 text-lg mb-10"
            >
                {loadingMessages[messageIndex]}
            </motion.p>

            {/* Skeleton cards */}
            <div className="w-full max-w-4xl space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <Skeleton className="w-64 h-96 rounded-2xl bg-gray-800" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-10 w-3/4 bg-gray-800" />
                        <div className="flex gap-3">
                            <Skeleton className="h-8 w-20 bg-gray-800 rounded-full" />
                            <Skeleton className="h-8 w-24 bg-gray-800 rounded-full" />
                            <Skeleton className="h-8 w-16 bg-gray-800 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-48 bg-gray-800" />
                        <Skeleton className="h-4 w-full bg-gray-800" />
                        <Skeleton className="h-4 w-5/6 bg-gray-800" />
                        <Skeleton className="h-4 w-4/6 bg-gray-800" />
                    </div>
                </div>
                <Skeleton className="h-32 w-full bg-gray-800 rounded-2xl" />
            </div>
        </div>
    );
}
