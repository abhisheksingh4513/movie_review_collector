# 🎬 AI Movie Insight Builder

A stunning full-stack web application that combines movie data from OMDb and TMDb with Google Gemini AI to provide AI-powered audience sentiment analysis.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

- 🔍 **IMDb ID Search** — Enter any IMDb ID to fetch comprehensive movie data
- 🎭 **Full Movie Info** — Poster, rating, genre, director, cast, box office, awards
- 🧑‍🤝‍🧑 **Top 10 Cast** — Profile photos and character names from TMDb
- 🤖 **AI Sentiment Analysis** — Google Gemini analyzes audience reviews
- 📊 **Sentiment Score** — Animated 0-100 score with positive/mixed/negative badge
- 💫 **Stunning Animations** — Framer Motion page transitions and micro-interactions
- 🌙 **Dark Theme** — Premium dark UI with gradient accents
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ⚡ **Smart Caching** — TanStack React Query with 10-min cache
- 🛡️ **Graceful Degradation** — AI unavailable? Movie data still displays

## 🏗️ Tech Stack & Rationale

| Technology | Why |
|---|---|
| **Next.js 14 (App Router)** | Unified frontend + backend, API routes, Vercel deployment |
| **TypeScript (strict)** | Type safety, better DX, fewer runtime errors |
| **Tailwind CSS** | Rapid UI development with design system |
| **Framer Motion** | Declarative animations, page transitions |
| **shadcn/ui** | Accessible, customizable UI primitives |
| **TanStack React Query** | Smart caching, loading/error states, deduplication |
| **Google Gemini AI** | Free tier, powerful sentiment analysis |
| **Axios** | Clean HTTP client with interceptors |
| **Jest + RTL** | Fast unit tests with accessible queries |

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-movie-insight
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys (see below).

### 4. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 API Keys Setup

All three APIs have free tiers:

| API | Get Key | Notes |
|---|---|---|
| **OMDb** | [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) | Free: 1,000 req/day |
| **TMDb** | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) | Free with account |
| **Gemini** | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | Free tier available |

## 🧪 Running Tests
```bash
npm run test          # Run all tests once
npm run test:watch    # Watch mode
```

## 📁 Project Structure

```
ai-movie-insight/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/movie/          # OMDb proxy
│   ├── api/reviews/        # TMDb cast + reviews proxy  
│   ├── api/sentiment/      # Gemini AI proxy
│   └── movie/[id]/         # Dynamic movie results page
├── components/             # 8 React components (client-side)
├── hooks/                  # useMovieData custom hook
├── lib/                    # API helpers (omdb, tmdb, gemini)
├── types/                  # TypeScript interfaces
└── __tests__/              # Jest + RTL test suites
```

## 📝 Assumptions

- Users have valid IMDb IDs (format: `tt` + 7-8 digits)
- API keys are valid and have available quota
- Internet connectivity for external API calls
- If Gemini AI is unavailable, app shows movie data without sentiment
- If no TMDb reviews exist, Gemini analyzes based on the movie plot instead

## 📜 Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "jest --watchAll=false",
  "test:watch": "jest --watchAll",
  "lint": "next lint"
}
```

## 📄 License

MIT
