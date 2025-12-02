'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProcessBand from '@/components/home/ProcessBand';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import AboutSection from '@/components/home/AboutSection';
import TeamSection from '@/components/home/TeamSection';
import { translations, translateStatus, translateTypology } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';
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

interface FeaturedProject {
  id: string;
  projectId: string;
  order: number;
  enabled: boolean;
  project: {
    id: string;
    slug: string;
    title: string;
    featuredImage: string;
    location: string;
    year: string;
    status: string;
    typology: string;
    shortDescription: string;
  };
}

interface HomeClientProps {
  enabledCategories: Array<{ id: string; slug: string; name: string; enabled: boolean; order: number }>;
  allProjects: Project[];
  featuredProjects: FeaturedProject[];
  locale: Locale;
}

export default function HomeClient({ enabledCategories, allProjects, featuredProjects, locale }: HomeClientProps) {
  const t = translations[locale];
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  // Use featured projects (first 8) for the hero carousel
  const heroProjects = allProjects.slice(0, 8);
  const currentProject = heroProjects[currentProjectIndex];

  // Auto-slide projects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % heroProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [resetTimer, heroProjects.length]);

  const goToNext = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % heroProjects.length);
    setResetTimer((prev) => prev + 1);
  };

  const goToPrev = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);
    setResetTimer((prev) => prev + 1);
  };

  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-white pt-20">
      {/* Main Project Display with Padding */}
      <div className="absolute inset-0 top-20 p-3 md:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <Link href={`/${locale}/projects/${currentProject.slug}`}>
              <div className="relative h-full w-full cursor-pointer group">
                <Image
                  src={currentProject.featuredImage}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Project Info */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-0 left-0 p-6 md:p-12 text-white max-w-2xl"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4">
                  {currentProject.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm uppercase tracking-wider opacity-80">
                  <span>{translateStatus(currentProject.status, locale)}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{translateTypology(currentProject.typology, locale)}</span>
                </div>

                {/* View Button - Desktop Only */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:inline-block mt-6 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase text-sm tracking-wider hover:bg-white/20 transition-colors"
                >
                  {t.home.viewProject}
                </motion.button>
              </motion.div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={goToPrev}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Project Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentProjectIndex(index);
              setResetTimer((prev) => prev + 1);
            }}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
              index === currentProjectIndex
                ? 'bg-white w-6 md:w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      </div>

      {/* Featured Projects with Category Filters */}
      <FeaturedProjects enabledCategories={enabledCategories} projects={allProjects} locale={locale} />

      {/* Process Band */}
      <ProcessBand locale={locale} />

      {/* About Section */}
      <AboutSection locale={locale} />

      {/* Projects Grid Section */}
      <ProjectsGrid featuredProjects={featuredProjects} locale={locale} />

      {/* Team Section */}
      <TeamSection locale={locale} />
    </>
  );
}
