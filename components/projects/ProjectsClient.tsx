'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { translations, translateTypology } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

interface Category {
  id: string;
  slug: string;
  name: string;
  enabled: boolean;
}

interface ProjectsClientProps {
  projects: Project[];
  categories: Category[];
  locale: Locale;
}

export default function ProjectsClient({ projects, categories = [], locale }: ProjectsClientProps) {
  const t = translations[locale];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'ALL' || project.typology === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 mb-6"
          >
            {t.projects.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-zinc-600 max-w-3xl font-light"
          >
            {t.projects.description}
          </motion.p>
        </div>
      </section>

      {/* Category Tabs Section - NOT STICKY */}
      <section className="bg-white border-b border-zinc-200 mb-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            <button
              key="ALL"
              onClick={() => setSelectedCategory('ALL')}
              className={`
                px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-medium tracking-wider uppercase
                transition-all duration-300 rounded-lg
                ${
                  selectedCategory === 'ALL'
                    ? 'bg-zinc-900 text-white shadow-lg'
                    : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
                }
              `}
            >
              {t.projects.all}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`
                  px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-medium tracking-wider uppercase
                  transition-all duration-300 rounded-lg
                  ${
                    selectedCategory === category.slug
                      ? 'bg-zinc-900 text-white shadow-lg'
                      : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
                  }
                `}
              >
                {translateTypology(category.slug, locale)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder={t.projects.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </div>

          {/* Results Count */}
          {(searchTerm || selectedCategory !== 'ALL') && (
            <div className="mt-4 text-center">
              <p className="text-sm text-zinc-600 uppercase tracking-wider">
                {filteredProjects.length} {filteredProjects.length === 1 ? t.projects.result : t.projects.results}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid - 3 Columns Simple Layout */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group relative overflow-hidden rounded-2xl"
                  style={{ height: '400px' }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Project Info - Always visible */}
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3">
                      <h3 className="text-white font-light text-base mb-0.5">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm font-light">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-xl text-zinc-600 mb-6">
                {t.projects.noResults}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('ALL');
                }}
                className="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {t.projects.viewAll}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
