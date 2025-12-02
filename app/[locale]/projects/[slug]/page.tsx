import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Users } from 'lucide-react';
import { prisma } from '@/lib/db';
import ImageGallery from '@/components/projects/ImageGallery';
import { Project } from '@/lib/types';
import { type Locale } from '@/lib/i18n/config';
import { translations, translateTypology, translateStatus } from '@/lib/i18n/translations';

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

export async function generateStaticParams() {
  const locales = ['es', 'en', 'zh', 'ja', 'pt'] as const;
  const dbProjects = await prisma.project.findMany();

  return locales.flatMap((locale) =>
    dbProjects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const t = translations[locale];

  const dbProject = await prisma.project.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  if (!dbProject) {
    notFound();
  }

  // Get translation for current locale or fallback to Spanish
  const translation = dbProject.translations[0];

  // Convert to Project type with translated content
  const project: Project = {
    id: dbProject.id,
    slug: dbProject.slug,
    title: translation?.title || dbProject.title,
    location: dbProject.location,
    year: dbProject.year,
    status: dbProject.status as 'completado' | 'en progreso' | 'concept',
    typology: dbProject.typology as 'industrial' | 'residencial' | 'comercial' | 'arte',
    description: translation?.description || dbProject.description,
    shortDescription: translation?.shortDescription || dbProject.shortDescription,
    images: safeJsonParse(dbProject.images, []),
    featuredImage: dbProject.featuredImage,
    tags: safeJsonParse(dbProject.tags, undefined),
    area: dbProject.area || undefined,
    client: dbProject.client || undefined,
    team: safeJsonParse(dbProject.team, undefined),
    featured: dbProject.featured,
  };

  // Find related projects (same typology, excluding current)
  const dbRelatedProjects = await prisma.project.findMany({
    where: {
      typology: dbProject.typology,
      NOT: { id: dbProject.id },
    },
    take: 3,
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  const relatedProjects: Project[] = dbRelatedProjects.map((p) => {
    const pTranslation = p.translations[0];
    return {
      id: p.id,
      slug: p.slug,
      title: pTranslation?.title || p.title,
      location: p.location,
      year: p.year,
      status: p.status as 'completado' | 'en progreso' | 'concept',
      typology: p.typology as 'industrial' | 'residencial' | 'comercial' | 'arte',
      description: pTranslation?.description || p.description,
      shortDescription: pTranslation?.shortDescription || p.shortDescription,
      images: safeJsonParse(p.images, []),
      featuredImage: p.featuredImage,
      tags: safeJsonParse(p.tags, undefined),
      area: p.area || undefined,
      client: p.client || undefined,
      team: safeJsonParse(p.team, undefined),
      featured: p.featured,
    };
  });

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Image */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Back Button - WITH LOCALE */}
            <Link
              href={`/${locale}/projects`}
              className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t.nav.allProjects}</span>
            </Link>

            {/* Project Title Overlay - Same style as ProjectsClient cards */}
            <div className="absolute bottom-0 left-0 p-6">
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3">
                <h1 className="text-white font-light text-base mb-0.5">
                  {project.title}
                </h1>
                <p className="text-white/70 text-sm font-light">
                  {project.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-light text-zinc-900 mb-6">
                  {t.project.details}
                </h2>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-zinc-700 text-lg leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Details Card */}
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-6">
                <h3 className="text-xl font-medium text-zinc-900">{t.project.details}</h3>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-500">{t.project.location}</p>
                      <p className="text-base text-zinc-900">{project.location}</p>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-500">{t.project.year}</p>
                      <p className="text-base text-zinc-900">{project.year}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t.project.status}</p>
                      <p className="text-base text-zinc-900">{translateStatus(project.status, locale)}</p>
                    </div>
                  </div>

                  {/* Typology */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t.project.typology}</p>
                      <p className="text-base text-zinc-900">{translateTypology(project.typology, locale)}</p>
                    </div>
                  </div>

                  {/* Area */}
                  {project.area && (
                    <div className="flex items-start gap-3">
                      <Ruler className="w-5 h-5 text-zinc-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500">{t.project.area}</p>
                        <p className="text-base text-zinc-900">{project.area} m²</p>
                      </div>
                    </div>
                  )}

                  {/* Client */}
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-zinc-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500">{t.project.client}</p>
                        <p className="text-base text-zinc-900">{project.client}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Team */}
              {project.team && project.team.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                  <h3 className="text-lg font-medium text-zinc-900 mb-4">
                    {t.project.team}
                  </h3>
                  <div className="space-y-2">
                    {project.team.map((member, i) => (
                      <p key={i} className="text-zinc-700 text-sm">
                        {typeof member === 'string' ? member : `${member.role}: ${member.members.join(', ')}`}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 mb-3">
                    {t.project.tags}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <ImageGallery images={project.images} title={project.title} locale={locale} />
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-zinc-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light text-zinc-900 mb-8">
              {t.project.relatedProjects}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/${locale}/projects/${relatedProject.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={relatedProject.featuredImage}
                      alt={relatedProject.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-zinc-600 text-sm flex items-center gap-2">
                    <MapPin size={14} />
                    {relatedProject.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              {t.projectDetail.ctaTitle}
            </h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              {t.projectDetail.ctaDescription}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-3 rounded-full font-medium hover:bg-zinc-100 transition-colors"
            >
              {t.projectDetail.ctaButton}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
