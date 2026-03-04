'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { CastMember } from '@/types/movie';

interface CastListProps {
    cast: CastMember[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CastList({ cast }: CastListProps) {
    if (!cast || cast.length === 0) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Top Cast</h2>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-4 md:pb-0 scrollbar-hide"
            >
                {cast.map((member) => (
                    <motion.div
                        key={`${member.name}-${member.character}`}
                        variants={cardVariants}
                        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)' }}
                        className="flex-shrink-0 w-36 md:w-auto bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 text-center transition-all duration-300 cursor-default"
                    >
                        <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700">
                            {member.profileImage ? (
                                <Image
                                    src={member.profileImage}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="h-8 w-8 text-gray-500" />
                                </div>
                            )}
                        </div>
                        <p className="text-white font-medium text-sm truncate">{member.name}</p>
                        <p className="text-gray-400 text-xs truncate mt-1">{member.character}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
