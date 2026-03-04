'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Clapperboard, Sparkles } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const exampleMovies = [
  { id: 'tt0133093', title: 'The Matrix' },
  { id: 'tt0468569', title: 'The Dark Knight' },
  { id: 'tt1375666', title: 'Inception' },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-violet-950/20 animate-gradient" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20 pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-3xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Clapperboard className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">CineInsight</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-center leading-tight mb-4"
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-violet-300 bg-clip-text text-transparent">
            Discover Movie
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Insights
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl text-center mb-10 max-w-xl leading-relaxed"
        >
          Enter any IMDb ID to get{' '}
          <span className="text-blue-400 font-medium">AI-powered audience sentiment</span>{' '}
          analysis and detailed movie information.
        </motion.p>

        <SearchBar />

        {/* Example IDs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Try these examples
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {exampleMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="group px-4 py-2 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/60 transition-all duration-300"
              >
                <span className="font-mono text-blue-400 text-sm group-hover:text-blue-300">
                  {movie.id}
                </span>
                <span className="text-gray-500 text-sm ml-2">{movie.title}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-6 text-center text-gray-600 text-sm"
      >
        Powered by <span className="text-gray-500">OMDB</span>,{' '}
        <span className="text-gray-500">TMDB</span> &{' '}
        <span className="text-gray-500">Google Gemini</span>
      </motion.footer>
    </main>
  );
}

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });