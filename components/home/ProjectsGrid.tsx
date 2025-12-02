'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { translations } from '@/lib/i18n/translations';

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

interface ProjectsGridProps {
  featuredProjects: FeaturedProject[];
  locale: Locale;
}

// Define different sizes for masonry layout
const gridLayouts = [
  { span: 'col-span-1 row-span-2', size: 'large' },  // Tall
  { span: 'col-span-1 row-span-1', size: 'normal' }, // Square
  { span: 'col-span-2 row-span-1', size: 'wide' },   // Wide
  { span: 'col-span-1 row-span-1', size: 'normal' }, // Square
  { span: 'col-span-1 row-span-2', size: 'large' },  // Tall
  { span: 'col-span-1 row-span-1', size: 'normal' }, // Square
  { span: 'col-span-2 row-span-2', size: 'xlarge' }, // Extra large
  { span: 'col-span-1 row-span-1', size: 'normal' }, // Square
];

export default function ProjectsGrid({ featuredProjects, locale }: ProjectsGridProps) {
  const t = translations[locale];

  // Map featured projects with grid layouts (up to 8 for desktop)
  const projectsWithLayout = featuredProjects.slice(0, 8).map((fp, index) => ({
    ...fp.project,
    layout: gridLayouts[index % gridLayouts.length]
  }));

  // For mobile, show first 6
  const mobileProjects = featuredProjects.slice(0, 6).map(fp => fp.project);

  return (
    <section className="bg-white pt-4 md:pt-8 pb-24 px-6 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-zinc-900 mb-4">
            {t.home.featured}
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl">
            {locale === 'es' ? 'Explora nuestro diverso portafolio de excelencia arquitectónica' :
             locale === 'en' ? 'Explore our diverse portfolio of architectural excellence' :
             locale === 'zh' ? '探索我们多样化的建筑卓越作品集' :
             locale === 'ja' ? '多様な建築の卓越性のポートフォリオをご覧ください' :
             'Explore nosso diverso portfólio de excelência arquitetônica'}
          </p>
        </motion.div>

        {/* Masonry Grid - Desktop */}
        <div className="hidden md:grid grid-cols-4 auto-rows-[250px] gap-4">
          {projectsWithLayout.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`${project.layout.span} group relative overflow-hidden rounded-2xl`}
            >
              <Link href={`/${locale}/projects/${project.slug}`} className="block h-full w-full">
                {/* Image Container */}
                <div className="relative h-full w-full">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      project.layout.size === 'xlarge' ? '(max-width: 768px) 100vw, 50vw' :
                      project.layout.size === 'wide' ? '(max-width: 768px) 100vw, 50vw' :
                      project.layout.size === 'large' ? '(max-width: 768px) 100vw, 25vw' :
                      '(max-width: 768px) 100vw, 25vw'
                    }
                  />

                  {/* Dark Gradient for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Liquid Glass Info Panel - Bottom Left */}
                <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
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
            </motion.div>
          ))}
        </div>

        {/* Masonry Grid - Mobile (Simpler Layout) */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {mobileProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`${
                index === 0 || index === 3 ? 'col-span-2' : 'col-span-1'
              } aspect-square group relative overflow-hidden rounded-xl`}
            >
              <Link href={`/${locale}/projects/${project.slug}`} className="block h-full w-full">
                {/* Image Container */}
                <div className="relative h-full w-full">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Mobile Info - Always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-medium text-sm">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {project.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            <span className="text-sm uppercase tracking-wider">{t.nav.allProjects}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
