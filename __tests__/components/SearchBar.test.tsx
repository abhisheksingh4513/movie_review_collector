import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/SearchBar';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial: _i, animate: _a, transition: _t, whileFocus: _w, ...rest } = props;
            return <div {...rest}>{children}</div>;
        },
        input: React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & Record<string, unknown>>(
            ({ children, initial: _i, animate: _a, transition: _t, whileFocus: _w, ...rest }, ref) => (
                <input ref={ref} {...rest}>{children}</input>
            )
        ),
        p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial: _i, animate: _a, ...rest } = props;
            return <p {...rest}>{children}</p>;
        },
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

describe('SearchBar', () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it('renders input and search button', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText(/enter imdb id/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('shows error for empty submission', async () => {
        render(<SearchBar />);
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(screen.getByText(/please enter an imdb id/i)).toBeInTheDocument();
    });

    it('shows error for invalid IMDb format', async () => {
        const user = userEvent.setup();
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/enter imdb id/i);
        await user.type(input, 'abc123');
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(screen.getByText(/imdb ids start with/i)).toBeInTheDocument();
    });

    it('navigates on valid submit', async () => {
        const user = userEvent.setup();
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/enter imdb id/i);
        await user.type(input, 'tt0133093');
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(mockPush).toHaveBeenCalledWith('/movie/tt0133093');
    });
});
