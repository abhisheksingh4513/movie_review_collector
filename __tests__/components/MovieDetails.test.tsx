import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetailsComponent from '@/components/MovieDetails';
import { MovieDetails } from '@/types/movie';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial: _i, animate: _a, transition: _t, ...rest } = props;
            return <div {...rest}>{children}</div>;
        },
    },
}));

const mockMovie: MovieDetails = {
    imdbID: 'tt0133093',
    title: 'The Matrix',
    year: '1999',
    rated: 'R',
    released: '31 Mar 1999',
    runtime: '136 min',
    genre: 'Action, Sci-Fi',
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld.',
    poster: 'https://example.com/poster.jpg',
    imdbRating: '8.7',
    imdbVotes: '1,900,000',
    boxOffice: '$171,479,930',
    awards: 'Won 4 Oscars. 42 wins & 52 nominations total',
};

describe('MovieDetails', () => {
    it('renders the plot/synopsis', () => {
        render(<MovieDetailsComponent movie={mockMovie} />);
        expect(screen.getByText(/when a beautiful stranger/i)).toBeInTheDocument();
    });

    it('renders box office information', () => {
        render(<MovieDetailsComponent movie={mockMovie} />);
        expect(screen.getByText('$171,479,930')).toBeInTheDocument();
    });

    it('renders awards information', () => {
        render(<MovieDetailsComponent movie={mockMovie} />);
        expect(screen.getByText(/Won 4 Oscars/)).toBeInTheDocument();
    });

    it('handles movie with empty plot gracefully', () => {
        const movieNoPlot: MovieDetails = { ...mockMovie, plot: '' };
        const { container } = render(<MovieDetailsComponent movie={movieNoPlot} />);
        expect(container).toBeTruthy();
    });
});
