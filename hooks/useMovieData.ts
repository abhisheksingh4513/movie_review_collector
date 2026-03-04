'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDetails, CastMember, Review, SentimentResult } from '@/types/movie';

interface MovieData {
    movie: MovieDetails;
    cast: CastMember[];
    reviews: Review[];
    sentiment: SentimentResult | null;
}

async function fetchAllMovieData(imdbId: string): Promise<MovieData> {
    // Step 1: Fetch movie details
    const { data: movie } = await axios.get<MovieDetails>(`/api/movie?id=${imdbId}`);

    // Step 2: Fetch cast and reviews in parallel
    const { data: reviewsData } = await axios.get<{ cast: CastMember[]; reviews: Review[] }>(
        `/api/reviews?id=${imdbId}`
    );

    // Step 3: Analyze sentiment
    let sentiment: SentimentResult | null = null;
    try {
        const { data: sentimentData } = await axios.post<SentimentResult>('/api/sentiment', {
            reviews: reviewsData.reviews,
            plot: movie.plot,
        });
        sentiment = sentimentData;
    } catch {
        console.warn('Sentiment analysis unavailable');
    }

    return {
        movie,
        cast: reviewsData.cast,
        reviews: reviewsData.reviews,
        sentiment,
    };
}

export function useMovieData(imdbId: string) {
    return useQuery<MovieData>({
        queryKey: ['movie', imdbId],
        queryFn: () => fetchAllMovieData(imdbId),
        enabled: !!imdbId && /^tt\d{7,8}$/.test(imdbId),
        staleTime: 600000, // 10 minutes
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            return failureCount < 2;
        },
    });
}
