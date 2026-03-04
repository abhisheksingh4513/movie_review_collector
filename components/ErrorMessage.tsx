'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RotateCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    const router = useRouter();

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md"
            >
                <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-block mb-6"
                >
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
                        <AlertTriangle className="h-10 w-10 text-red-400" />
                    </div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">{message}</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={onRetry}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-6"
                        id="retry-button"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 px-6"
                        id="search-another-button"
                    >
                        <Search className="h-4 w-4 mr-2" />
                        Search Another Movie
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
