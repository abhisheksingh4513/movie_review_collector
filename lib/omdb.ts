import axios from 'axios';
import { MovieDetails } from '@/types/movie';

const IMDB_ID_REGEX = /^tt\d{7,8}$/;

export function validateImdbId(id: string): string {
    const trimmed = id.trim().toLowerCase();
    if (!IMDB_ID_REGEX.test(trimmed)) {
        throw new Error('Invalid IMDb ID format. IMDb IDs start with "tt" followed by 7-8 digits.');
    }
    return trimmed;
}

function sanitize(value: string | undefined): string {
    return value && value !== 'N/A' ? value : '';
}

export async function fetchMovieByImdbId(imdbId: string): Promise<MovieDetails> {
    const validId = validateImdbId(imdbId);
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        throw new Error('OMDB API key is not configured.');
    }

    try {
        const { data } = await axios.get('https://www.omdbapi.com/', {
            params: { i: validId, apikey: apiKey, plot: 'full' },
        });

        if (data.Response === 'False') {
            throw new Error(data.Error || 'Movie not found');
        }

        return {
            imdbID: data.imdbID,
            title: data.Title,
            year: data.Year,
            rated: sanitize(data.Rated),
            released: sanitize(data.Released),
            runtime: sanitize(data.Runtime),
            genre: sanitize(data.Genre),
            director: sanitize(data.Director),
            actors: sanitize(data.Actors),
            plot: sanitize(data.Plot),
            poster: data.Poster && data.Poster !== 'N/A' ? data.Poster : '',
            imdbRating: sanitize(data.imdbRating),
            imdbVotes: sanitize(data.imdbVotes),
            boxOffice: sanitize(data.BoxOffice),
            awards: sanitize(data.Awards),
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Failed to fetch movie data. Please try again later.');
        }
        throw error;
    }
}
