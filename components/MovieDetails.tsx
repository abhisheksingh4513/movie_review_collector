'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MovieDetails as MovieDetailsType } from '@/types/movie';

interface MovieDetailsProps {
    movie: MovieDetailsType;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
    const [plotExpanded, setPlotExpanded] = useState(false);

    const plotIsLong = movie.plot && movie.plot.length > 300;
    const displayPlot = plotExpanded || !plotIsLong
        ? movie.plot
        : movie.plot.substring(0, 300) + '...';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 overflow-hidden">
                <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Plot */}
                    {movie.plot && (
                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed text-base" id="movie-plot">
                                {displayPlot || 'Plot information not available.'}
                            </p>
                            {plotIsLong && (
                                <button
                                    onClick={() => setPlotExpanded(!plotExpanded)}
                                    className="text-blue-400 hover:text-blue-300 text-sm mt-2 flex items-center gap-1 transition-colors"
                                >
                                    {plotExpanded ? (
                                        <>Show Less <ChevronUp className="h-4 w-4" /></>
                                    ) : (
                                        <>Read More <ChevronDown className="h-4 w-4" /></>
                                    )}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                        {movie.boxOffice && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
                                <DollarSign className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">Box Office</p>
                                    <p className="text-white font-semibold text-lg">{movie.boxOffice}</p>
                                </div>
                            </div>
                        )}
                        {movie.awards && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
                                <Trophy className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">Awards</p>
                                    <p className="text-white font-semibold text-sm">{movie.awards}</p>
                                </div>
                            </div>
                        )}
                        {movie.imdbVotes && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
                                <Users className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">IMDb Votes</p>
                                    <p className="text-white font-semibold text-lg">{Number(movie.imdbVotes.replace(/,/g, '')).toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
