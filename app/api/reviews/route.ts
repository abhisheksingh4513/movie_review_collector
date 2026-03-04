import { NextRequest, NextResponse } from 'next/server';
import { fetchMovieCast, fetchMovieReviews } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: 'Missing IMDb ID.' },
            { status: 400 }
        );
    }

    try {
        const [cast, reviews] = await Promise.all([
            fetchMovieCast(id),
            fetchMovieReviews(id),
        ]);

        return NextResponse.json({ cast, reviews });
    } catch {
        return NextResponse.json({ cast: [], reviews: [] });
    }
}
