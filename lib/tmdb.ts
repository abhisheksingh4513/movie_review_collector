import axios from 'axios';
import { CastMember, Review } from '@/types/movie';

const TMDB_BASE = 'https://api.themoviedb.org/3';

function getApiKey(): string {
    const key = process.env.TMDB_API_KEY;
    if (!key) throw new Error('TMDB API key is not configured.');
    return key;
}

export async function getTmdbIdFromImdbId(imdbId: string): Promise<number | null> {
    try {
        const { data } = await axios.get(`${TMDB_BASE}/find/${imdbId}`, {
            params: { api_key: getApiKey(), external_source: 'imdb_id' },
        });

        const results = data.movie_results;
        if (!results || results.length === 0) return null;
        return results[0].id;
    } catch {
        return null;
    }
}

export async function fetchMovieReviews(imdbId: string): Promise<Review[]> {
    try {
        const tmdbId = await getTmdbIdFromImdbId(imdbId);
        if (!tmdbId) return [];

        const { data } = await axios.get(`${TMDB_BASE}/movie/${tmdbId}/reviews`, {
            params: { api_key: getApiKey() },
        });

        if (!data.results || data.results.length === 0) return [];

        return data.results.map((r: {
            author: string;
            content: string;
            author_details?: { rating?: number | null };
            created_at: string;
        }) => ({
            author: r.author,
            content: r.content,
            rating: r.author_details?.rating ?? null,
            createdAt: r.created_at,
        }));
    } catch {
        return [];
    }
}

export async function fetchMovieCast(imdbId: string): Promise<CastMember[]> {
    try {
        const tmdbId = await getTmdbIdFromImdbId(imdbId);
        if (!tmdbId) return [];

        const { data } = await axios.get(`${TMDB_BASE}/movie/${tmdbId}/credits`, {
            params: { api_key: getApiKey() },
        });

        if (!data.cast || data.cast.length === 0) return [];

        return data.cast.slice(0, 10).map((c: {
            name: string;
            character: string;
            profile_path: string | null;
        }) => ({
            name: c.name,
            character: c.character,
            profileImage: c.profile_path
                ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                : null,
        }));
    } catch {
        return [];
    }
}
