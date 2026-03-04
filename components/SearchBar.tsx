'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Film, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IMDB_REGEX = /^tt\d{7,8}$/;

export default function SearchBar() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    function validate(input: string): boolean {
        const trimmed = input.trim().toLowerCase();
        if (!trimmed) {
            setError('Please enter an IMDb ID');
            return false;
        }
        if (!IMDB_REGEX.test(trimmed)) {
            setError('IMDb IDs start with "tt" followed by 7-8 digits (e.g. tt0133093)');
            return false;
        }
        setError('');
        return true;
    }

    function handleSubmit(e?: FormEvent) {
        e?.preventDefault();
        const trimmed = value.trim().toLowerCase();
        if (!validate(trimmed)) return;
        setIsSearching(true);
        router.push(`/movie/${trimmed}`);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') handleSubmit();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <Film className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (error) setError('');
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter IMDb ID (e.g. tt0133093)"
                        className={`w-full pl-12 pr-32 py-4 rounded-2xl bg-gray-900/80 backdrop-blur-sm border-2 text-white placeholder-gray-500 text-lg font-mono outline-none transition-all duration-300 ${error
                                ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                                : 'border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                            }`}
                        id="search-input"
                    />
                    <Button
                        type="submit"
                        disabled={isSearching}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl px-6 py-2.5 font-semibold transition-all duration-300"
                        id="search-button"
                    >
                        {isSearching ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </>
                        )}
                    </Button>
                </div>
            </form>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 ml-4"
                    id="search-error"
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}
