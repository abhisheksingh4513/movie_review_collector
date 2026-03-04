import { GoogleGenerativeAI } from '@google/generative-ai';
import { Review, SentimentResult } from '@/types/movie';

const DEFAULT_SENTIMENT: SentimentResult = {
    summary: 'Unable to determine sentiment. The movie has mixed audience reception based on available data.',
    classification: 'mixed',
    keyPoints: ['Insufficient data for detailed analysis', 'Consider watching to form your own opinion'],
    score: 50,
};

export async function analyzeSentiment(
    reviews: Review[],
    moviePlot: string
): Promise<SentimentResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('Gemini API key not configured. Returning default sentiment.');
        return DEFAULT_SENTIMENT;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-2.0-flash-lite for better free tier quota limits
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

        let reviewContext: string;
        if (reviews.length > 0) {
            reviewContext = reviews
                .slice(0, 15)
                .map((r) => `[${r.author}]: ${r.content.substring(0, 500)}`)
                .join('\n\n');
        } else {
            reviewContext = `No audience reviews available. Movie plot summary: ${moviePlot}`;
        }

        const prompt = `You are a movie sentiment analyst. Based on the following audience reviews for a movie, provide:
1. A 2-3 sentence summary of overall audience sentiment
2. Classification: exactly one of 'positive', 'mixed', or 'negative'
3. 3-5 key points audiences mention (bullet points)
4. A sentiment score from 0-100 (0=very negative, 100=very positive)

Reviews:
${reviewContext}

Respond in this exact JSON format and nothing else:
{
  "summary": "...",
  "classification": "positive|mixed|negative",
  "keyPoints": ["...", "...", "..."],
  "score": 75
}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.warn('Could not extract JSON from Gemini response');
            return DEFAULT_SENTIMENT;
        }

        const parsed = JSON.parse(jsonMatch[0]);

        // Validate required fields
        const validClassifications = ['positive', 'mixed', 'negative'] as const;
        const classification = validClassifications.includes(parsed.classification)
            ? parsed.classification
            : 'mixed';

        const score = typeof parsed.score === 'number'
            ? Math.max(0, Math.min(100, parsed.score))
            : 50;

        return {
            summary: parsed.summary || DEFAULT_SENTIMENT.summary,
            classification,
            keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : DEFAULT_SENTIMENT.keyPoints,
            score,
        };
    } catch (error: any) {
        // Handle specific error types
        if (error?.status === 429 || error?.message?.includes('quota')) {
            console.warn('⚠️  Gemini API quota exceeded. Using basic sentiment analysis.');
            // Return a basic sentiment based on review content analysis
            return generateBasicSentiment(reviews);
        }
        
        if (error?.status === 404) {
            console.error('❌ Gemini model not found. Please check API key and model availability.');
        } else {
            console.error('Gemini API error:', error?.message || error);
        }
        
        return DEFAULT_SENTIMENT;
    }
}

/**
 * Generate basic sentiment when API is unavailable
 * Uses simple keyword analysis as fallback
 */
function generateBasicSentiment(reviews: Review[]): SentimentResult {
    if (reviews.length === 0) {
        return DEFAULT_SENTIMENT;
    }

    // Simple keyword-based sentiment analysis
    const positiveKeywords = ['great', 'amazing', 'excellent', 'love', 'best', 'wonderful', 'fantastic', 'perfect', 'awesome', 'brilliant'];
    const negativeKeywords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'boring', 'waste', 'disappointing', 'poor', 'horrible'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    reviews.slice(0, 20).forEach(review => {
        const content = review.content.toLowerCase();
        positiveKeywords.forEach(word => {
            if (content.includes(word)) positiveCount++;
        });
        negativeKeywords.forEach(word => {
            if (content.includes(word)) negativeCount++;
        });
    });
    
    const totalCount = positiveCount + negativeCount;
    const positiveRatio = totalCount > 0 ? positiveCount / totalCount : 0.5;
    
    let classification: 'positive' | 'mixed' | 'negative';
    let summary: string;
    let score: number;
    
    if (positiveRatio > 0.6) {
        classification = 'positive';
        summary = `Based on ${reviews.length} reviews, audiences generally enjoyed this movie. Many viewers found it entertaining and worth watching.`;
        score = 65 + Math.floor(positiveRatio * 25);
    } else if (positiveRatio < 0.4) {
        classification = 'negative';
        summary = `Based on ${reviews.length} reviews, audiences had mixed to negative reactions to this movie. Many viewers expressed disappointment.`;
        score = 20 + Math.floor(positiveRatio * 30);
    } else {
        classification = 'mixed';
        summary = `Based on ${reviews.length} reviews, audiences are divided on this movie. Some enjoyed it while others found it lacking.`;
        score = 40 + Math.floor(positiveRatio * 20);
    }
    
    return {
        summary,
        classification,
        keyPoints: [
            'AI sentiment analysis temporarily unavailable',
            'Basic analysis from audience reviews',
            `${reviews.length} reviews analyzed`
        ],
        score,
    };
}
