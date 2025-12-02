'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';
import { type Locale } from '@/lib/i18n/config';
import { translateStatus } from '@/lib/i18n/translations';

interface ProjectCardProps {
  project: Project;
  index?: number;
  locale: Locale;
}

export default function ProjectCard({ project, index = 0, locale }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/${locale}/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[4/3]">
          {/* Image Container */}
          <div className="absolute inset-0">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              initial={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                project.status === 'completado'
                  ? 'bg-green-500/90 text-white'
                  : project.status === 'en progreso'
                  ? 'bg-yellow-500/90 text-white'
                  : 'bg-gray-500/90 text-white'
              }`}
            >
              {translateStatus(project.status, locale)}
            </motion.span>
          </div>

          {/* View Project Button - Appears on Hover */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <ArrowUpRight className="text-zinc-900" size={20} />
            </motion.div>
          </div>

          {/* Content Overlay - Slides Up on Hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white z-10"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category & Year - Always Visible */}
            <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-xs uppercase tracking-wider font-medium text-white/80">
                {project.typology}
              </span>
              <span className="w-1 h-1 bg-white/60 rounded-full" />
              <span className="text-xs text-white/80">{project.year}</span>
            </div>

            {/* Title - Always Visible */}
            <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
              {project.title}
            </h3>

            {/* Location - Slides Up on Hover */}
            <div className="flex items-center gap-2 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <MapPin size={14} />
              <span>{project.location}</span>
            </div>

            {/* Description - Appears on Hover */}
            <p className="mt-3 text-sm text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
              {project.shortDescription}
            </p>
          </motion.div>

          {/* Alternative Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-lg">{project.title}</h3>
            <p className="text-white/80 text-sm">{project.location}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}