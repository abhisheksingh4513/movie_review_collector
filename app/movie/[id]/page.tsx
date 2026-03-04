'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMovieData } from '@/hooks/useMovieData';
import MovieHero from '@/components/MovieHero';
import MovieDetails from '@/components/MovieDetails';
import CastList from '@/components/CastList';
import SentimentBadge from '@/components/SentimentBadge';
import ReviewSummary from '@/components/ReviewSummary';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';

const IMDB_REGEX = /^tt\d{7,8}$/;

export default function MoviePage() {
    const params = useParams();
    const router = useRouter();
    const rawId = (params.id as string) || '';
    const imdbId = rawId.trim().toLowerCase();

    // Redirect if invalid
    useEffect(() => {
        if (!IMDB_REGEX.test(imdbId)) {
            router.replace('/');
        }
    }, [imdbId, router]);

    const { data, isLoading, isError, error, refetch } = useMovieData(imdbId);

    if (!IMDB_REGEX.test(imdbId)) return null;

    if (isLoading) return <LoadingScreen />;

    if (isError) {
        const message =
            (error as Error)?.message ||
            'No movie found for this IMDb ID. Please check and try again.';
        return (
            <div className="min-h-screen bg-gray-950 pt-8">
                <div className="max-w-5xl mx-auto px-4">
                    <BackButton />
                </div>
                <ErrorMessage message={message} onRetry={() => refetch()} />
            </div>
        );
    }

    if (!data) return null;

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-950"
        >
            {/* Subtle gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-violet-950/10 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-10">
                {/* Back button */}
                <BackButton />

                {/* Hero */}
                <MovieHero movie={data.movie} />

                {/* Details */}
                <MovieDetails movie={data.movie} />

                {/* Cast */}
                {data.cast && data.cast.length > 0 && <CastList cast={data.cast} />}

                {/* Sentiment section */}
                {data.sentiment && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white">AI Sentiment Analysis</h2>
                        <SentimentBadge
                            classification={data.sentiment.classification}
                            score={data.sentiment.score}
                        />
                        <ReviewSummary sentiment={data.sentiment} />
                    </motion.section>
                )}

                {/* Footer spacing */}
                <div className="pb-8" />
            </div>
        </motion.main>
    );
}

function BackButton() {
    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 -ml-2"
                id="back-button"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Search Another Movie
            </Button>
        </motion.div>
    );
}
