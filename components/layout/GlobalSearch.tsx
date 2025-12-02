'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from './SearchProvider';
import { translations, translateTypology, translateTag } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

interface Tag {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  featuredImage: string;
  tags?: string | null;
}

interface GlobalSearchProps {
  tags: Tag[];
  popularProjects: Project[];
  allProjects: Project[];
  locale: Locale;
}

export default function GlobalSearch({ tags, popularProjects, allProjects, locale }: GlobalSearchProps) {
  const { isSearchOpen, closeSearch } = useSearch();
  const t = translations[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? allProjects.filter(project => project.tags?.includes(selectedTag))
    : allProjects;

  // Show filtered projects in search results, or all projects if no tag selected
  const searchResults = filteredProjects.filter(project => {
    if (searchQuery) {
      return project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             project.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closeSearch}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-[80%] w-full md:w-[520px] z-50 p-4"
          >
        <div className="h-full backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden relative flex flex-col" style={{ backgroundColor: 'rgba(226, 232, 220, 0.7)' }}>
        {/* Header Section */}
        <div className="p-6 md:p-8 flex-shrink-0">
          {/* Close Button and Text */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-light text-zinc-800">
              {selectedTag ? translateTypology(selectedTag, locale) : t.search.title}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={closeSearch}
                className="text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-800"
              >
                {t.search.close}
              </button>
              <button
                onClick={closeSearch}
                className="p-1.5 text-zinc-700 hover:bg-gray-200/50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {selectedTag && (
            <p className="text-sm text-zinc-600 mb-4">
              {searchResults.length} {t.search.results}
            </p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="px-6 md:px-8 pb-6 md:pb-8 overflow-y-auto flex-1">

          {/* Search Input */}
          <div className="relative mb-6 md:mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full px-4 py-3 backdrop-blur-md rounded-2xl text-zinc-800 placeholder-zinc-500 focus:outline-none transition-colors border-0"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          </div>

          {/* Tags */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-xs md:text-sm uppercase tracking-wider text-zinc-600 mb-4">{t.search.filterByTag}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    if (selectedTag === tag.name) {
                      setSelectedTag(null);
                      setSearchQuery('');
                    } else {
                      setSelectedTag(tag.name);
                      setSearchQuery('');
                    }
                  }}
                  className={`px-3 py-1.5 text-xs md:text-sm border transition-all rounded ${
                    selectedTag === tag.name
                      ? 'bg-zinc-800 text-white border-zinc-800'
                      : 'bg-white/50 text-zinc-700 border-gray-300/50 hover:bg-white/70'
                  }`}
                >
                  {translateTag(tag.name, locale)}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results / Popular Projects */}
          <div>
            {!selectedTag && !searchQuery && (
              <h3 className="text-xs md:text-sm uppercase tracking-wider text-zinc-600 mb-4">{t.search.popularProjects}</h3>
            )}
            <div className="space-y-3 md:space-y-4">
              {(selectedTag || searchQuery ? searchResults : popularProjects).map((project) => (
                <Link
                  key={project.id}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block"
                  onClick={closeSearch}
                >
                  <div className="flex gap-3 md:gap-4 p-2 md:p-3 -mx-2 md:-mx-3 hover:bg-gray-200/30 rounded-lg transition-colors">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-zinc-800 font-light text-sm md:text-base mb-1 group-hover:text-zinc-900 transition-colors truncate">
                        {project.title}
                      </h4>
                      <div className="text-xs text-zinc-600 uppercase tracking-wider">
                        <span>{t.search.project}</span>
                        {selectedTag && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{translateTypology(selectedTag, locale)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
