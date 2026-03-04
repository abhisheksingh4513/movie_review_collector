export interface MovieDetails {
  imdbID: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  poster: string;
  imdbRating: string;
  imdbVotes: string;
  boxOffice: string;
  awards: string;
}

export interface CastMember {
  name: string;
  character: string;
  profileImage: string | null;
}

export interface Review {
  author: string;
  content: string;
  rating: number | null;
  createdAt: string;
}

export interface SentimentResult {
  summary: string;
  classification: 'positive' | 'mixed' | 'negative';
  keyPoints: string[];
  score: number; // 0-100
}

export interface MovieInsight {
  movie: MovieDetails;
  cast: CastMember[];
  reviews: Review[];
  sentiment: SentimentResult;
}
