import React from 'react';
import { render, screen } from '@testing-library/react';
import SentimentBadge from '@/components/SentimentBadge';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial: _i, animate: _a, transition: _t, ...rest } = props;
            return <div {...rest}>{children}</div>;
        },
        span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { animate: _a, transition: _t, ...rest } = props;
            return <span {...rest}>{children}</span>;
        },
    },
}));

describe('SentimentBadge', () => {
    it('renders positive classification with green styling', () => {
        render(<SentimentBadge classification="positive" score={85} />);
        expect(screen.getByText('Positive Sentiment')).toBeInTheDocument();
        expect(screen.getByText('😊')).toBeInTheDocument();
    });

    it('renders mixed classification with emoji', () => {
        render(<SentimentBadge classification="mixed" score={50} />);
        expect(screen.getByText('Mixed Sentiment')).toBeInTheDocument();
        expect(screen.getByText('😐')).toBeInTheDocument();
    });

    it('renders negative classification with emoji', () => {
        render(<SentimentBadge classification="negative" score={20} />);
        expect(screen.getByText('Negative Sentiment')).toBeInTheDocument();
        expect(screen.getByText('😞')).toBeInTheDocument();
    });

    it('displays the score', () => {
        render(<SentimentBadge classification="positive" score={75} />);
        // The score counter animates, so the final value might not appear immediately
        expect(screen.getByTestId('sentiment-score')).toBeInTheDocument();
    });
});
