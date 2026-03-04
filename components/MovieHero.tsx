'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MovieDetails } from '@/types/movie';

interface MovieHeroProps {
    movie: MovieDetails;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MovieHero({ movie }: MovieHeroProps) {
    const genres = movie.genre ? movie.genre.split(', ') : [];

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start"
        >
            {/* Poster */}
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="relative flex-shrink-0 w-64 md:w-80 group"
            >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-800">
                    {movie.poster ? (
                        <Image
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            width={320}
                            height={480}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                    ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 text-lg">No Poster Available</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent leading-tight"
                >
                    {movie.title}
                </motion.h1>

                {/* Meta pills */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start"
                >
                    {movie.year && (
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 px-3 py-1.5 text-sm">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {movie.year}
                        </Badge>
                    )}
                    {movie.runtime && (
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 px-3 py-1.5 text-sm">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {movie.runtime}
                        </Badge>
                    )}
                    {movie.rated && (
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 px-3 py-1.5 text-sm">
                            <Shield className="h-3.5 w-3.5 mr-1.5" />
                            {movie.rated}
                        </Badge>
                    )}
                </motion.div>

                {/* IMDb Rating */}
                {movie.imdbRating && (
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 mt-5 justify-center md:justify-start"
                    >
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-3xl font-bold text-white">{movie.imdbRating}</span>
                        <span className="text-gray-400 text-lg">/ 10</span>
                        {movie.imdbVotes && (
                            <span className="text-gray-500 text-sm ml-2">
                                ({movie.imdbVotes} votes)
                            </span>
                        )}
                    </motion.div>
                )}

                {/* Genre tags */}
                {genres.length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start"
                    >
                        {genres.map((genre) => (
                            <Badge
                                key={genre}
                                className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-blue-300 border-blue-500/30 hover:border-blue-400/50 px-3 py-1"
                            >
                                {genre}
                            </Badge>
                        ))}
                    </motion.div>
                )}

                {/* Director */}
                {movie.director && (
                    <motion.p
                        variants={itemVariants}
                        className="mt-5 text-gray-400 text-lg"
                    >
                        Directed by{' '}
                        <span className="text-white font-medium">{movie.director}</span>
                    </motion.p>
                )}
            </div>
        </motion.section>
    );
}
