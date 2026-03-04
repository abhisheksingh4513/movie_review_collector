import { NextRequest, NextResponse } from 'next/server';
import { fetchMovieByImdbId, validateImdbId } from '@/lib/omdb';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: 'Missing IMDb ID. Please provide an id query parameter.' },
            { status: 400 }
        );
    }

    try {
        validateImdbId(id);
    } catch {
        return NextResponse.json(
            { error: 'Invalid IMDb ID format. IMDb IDs start with "tt" followed by 7-8 digits.' },
            { status: 400 }
        );
    }

    try {
        const movie = await fetchMovieByImdbId(id);
        return NextResponse.json(movie);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';

        if (message.includes('not found')) {
            return NextResponse.json({ error: message }, { status: 404 });
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
