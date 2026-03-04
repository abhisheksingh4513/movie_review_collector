import { analyzeSentiment } from '@/lib/gemini';
import { Review } from '@/types/movie';

// Mock the Google Generative AI package
jest.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
            generateContent: jest.fn(),
        }),
    })),
}));

// Import after mock
import { GoogleGenerativeAI } from '@google/generative-ai';

const mockReviews: Review[] = [
    {
        author: 'TestUser',
        content: 'Great movie with amazing visuals!',
        rating: 8,
        createdAt: '2024-01-01',
    },
];

describe('analyzeSentiment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.GEMINI_API_KEY = 'test-key';
    });

    afterEach(() => {
        delete process.env.GEMINI_API_KEY;
    });

    it('returns default sentiment when API key is missing', async () => {
        delete process.env.GEMINI_API_KEY;
        const result = await analyzeSentiment([], 'A test plot');
        expect(result.classification).toBe('mixed');
        expect(result.score).toBe(50);
    });

    it('correctly parses valid Gemini JSON response', async () => {
        const mockResponse = {
            response: {
                text: () =>
                    JSON.stringify({
                        summary: 'Audiences love this movie.',
                        classification: 'positive',
                        keyPoints: ['Great visuals', 'Strong acting'],
                        score: 88,
                    }),
            },
        };

        const mockModel = {
            generateContent: jest.fn().mockResolvedValue(mockResponse),
        };

        (GoogleGenerativeAI as unknown as jest.Mock).mockImplementation(() => ({
            getGenerativeModel: () => mockModel,
        }));

        const result = await analyzeSentiment(mockReviews, 'A test plot');
        expect(result.classification).toBe('positive');
        expect(result.score).toBe(88);
        expect(result.summary).toBe('Audiences love this movie.');
        expect(result.keyPoints).toEqual(['Great visuals', 'Strong acting']);
    });

    it('returns fallback on JSON parse error', async () => {
        const mockResponse = {
            response: {
                text: () => 'This is not valid JSON at all',
            },
        };

        const mockModel = {
            generateContent: jest.fn().mockResolvedValue(mockResponse),
        };

        (GoogleGenerativeAI as unknown as jest.Mock).mockImplementation(() => ({
            getGenerativeModel: () => mockModel,
        }));

        const result = await analyzeSentiment(mockReviews, 'A test plot');
        expect(result.classification).toBe('mixed');
        expect(result.score).toBe(50);
    });
});
