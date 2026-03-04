import { NextRequest, NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/gemini';
import { Review } from '@/types/movie';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { reviews, plot } = body as { reviews: Review[]; plot: string };

        // analyzeSentiment now has robust error handling and always returns a valid result
        const sentiment = await analyzeSentiment(reviews || [], plot || '');
        return NextResponse.json(sentiment);
    } catch (error) {
        console.error('Sentiment route error:', error);
        // Return default sentiment instead of error to keep UI functional
        return NextResponse.json({
            summary: 'Unable to analyze sentiment at this time. The movie has mixed audience reception.',
            classification: 'mixed',
            keyPoints: ['Sentiment analysis temporarily unavailable', 'Please try again later'],
            score: 50,
        });
    }
}
