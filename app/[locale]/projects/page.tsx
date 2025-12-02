import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import ProjectsClient from '@/components/projects/ProjectsClient';
import { Project } from '@/lib/types';
import { getEnabledCategories } from '@/lib/actions/categories';
import { type Locale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

async function getProjects(locale: Locale): Promise<Project[]> {
  const dbProjects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  return dbProjects.map((project) => {
    const translation = project.translations[0];
    return {
      id: project.id,
      slug: project.slug,
      title: translation?.title || project.title,
      location: project.location,
      year: project.year,
      status: project.status as 'completado' | 'en progreso' | 'concept',
      typology: project.typology as 'industrial' | 'residencial' | 'comercial' | 'arte',
      description: translation?.description || project.description,
      shortDescription: translation?.shortDescription || project.shortDescription,
      images: safeJsonParse(project.images, []),
      featuredImage: project.featuredImage,
      tags: safeJsonParse(project.tags, undefined),
      area: project.area || undefined,
      client: project.client || undefined,
      team: safeJsonParse(project.team, undefined),
      featured: project.featured,
    };
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const projects = await getProjects(locale);
  const categories = await getEnabledCategories();

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProjectsClient projects={projects} categories={categories} locale={locale} />
    </Suspense>
  );
}
