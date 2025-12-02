'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { translateTypology, translateStatus } from '@/lib/i18n/translations';

interface Category {
  id: string;
  slug: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  featuredImage: string;
  location: string;
  year: string;
  status: string;
  typology: string;
  shortDescription: string;
}

interface FeaturedProjectsProps {
  enabledCategories: Category[];
  projects: Project[];
  locale: Locale;
}

export default function FeaturedProjects({ enabledCategories, projects, locale }: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(enabledCategories[0]?.slug || '');

  // Filter projects by category and limit to 3
  const filteredProjects = projects
    .filter((project) => project.typology === selectedCategory)
    .slice(0, 3);

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {enabledCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`text-base md:text-xl font-light tracking-wide transition-all duration-300 px-4 py-2 ${
                selectedCategory === category.slug
                  ? 'text-zinc-900 border-b-2 border-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {translateTypology(category.slug, locale).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/${locale}/projects/${project.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 transition-all hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-light mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 shadow-lg">
                      {translateStatus(project.status, locale)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-zinc-600 font-light">No hay proyectos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
