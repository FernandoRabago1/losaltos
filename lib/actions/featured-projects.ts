'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface FeaturedProjectWithDetails {
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

/**
 * Get all featured projects ordered by their order field
 */
export async function getFeaturedProjects(): Promise<FeaturedProjectWithDetails[]> {
  try {
    const featuredProjects = await prisma.featuredProject.findMany({
      orderBy: { order: 'asc' },
      include: {
        project: {
          select: {
            id: true,
            slug: true,
            title: true,
            featuredImage: true,
            location: true,
            year: true,
            status: true,
            typology: true,
            shortDescription: true,
          },
        },
      },
    });

    // Type assertion needed because Prisma doesn't know about the relation yet
    return featuredProjects.map((fp) => ({
      id: fp.id,
      projectId: fp.projectId,
      order: fp.order,
      enabled: fp.enabled,
      project: fp.project,
    }));
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

/**
 * Get only enabled featured projects
 */
export async function getEnabledFeaturedProjects(): Promise<FeaturedProjectWithDetails[]> {
  try {
    const featuredProjects = await prisma.featuredProject.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
      include: {
        project: {
          select: {
            id: true,
            slug: true,
            title: true,
            featuredImage: true,
            location: true,
            year: true,
            status: true,
            typology: true,
            shortDescription: true,
          },
        },
      },
    });

    return featuredProjects.map((fp) => ({
      id: fp.id,
      projectId: fp.projectId,
      order: fp.order,
      enabled: fp.enabled,
      project: fp.project,
    }));
  } catch (error) {
    console.error('Error fetching enabled featured projects:', error);
    return [];
  }
}

/**
 * Get only enabled featured projects with translations
 */
export async function getEnabledFeaturedProjectsWithTranslations(locale: string = 'es'): Promise<FeaturedProjectWithDetails[]> {
  try {
    const featuredProjects = await prisma.featuredProject.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
      include: {
        project: {
          select: {
            id: true,
            slug: true,
            title: true,
            featuredImage: true,
            location: true,
            year: true,
            status: true,
            typology: true,
            shortDescription: true,
          },
        },
      },
    });

    // Fetch translations for these projects
    const projectIds = featuredProjects.map(fp => fp.project.id);
    const translations = await prisma.projectTranslation.findMany({
      where: {
        projectId: { in: projectIds },
        locale,
      },
    });

    // Create a map of translations by projectId
    const translationMap = new Map(translations.map(t => [t.projectId, t]));

    return featuredProjects.map((fp) => {
      const translation = translationMap.get(fp.project.id);
      return {
        id: fp.id,
        projectId: fp.projectId,
        order: fp.order,
        enabled: fp.enabled,
        project: {
          ...fp.project,
          title: translation?.title || fp.project.title,
          shortDescription: translation?.shortDescription || fp.project.shortDescription,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching enabled featured projects with translations:', error);
    return [];
  }
}

/**
 * Add a project to featured projects
 */
export async function addFeaturedProject(projectId: string) {
  try {
    // Get the current max order
    const maxOrder = await prisma.featuredProject.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = (maxOrder?.order ?? -1) + 1;

    const featuredProject = await prisma.featuredProject.create({
      data: {
        projectId,
        order: newOrder,
        enabled: true,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/featured-projects');

    return { success: true, data: featuredProject };
  } catch (error) {
    console.error('Error adding featured project:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return { success: false, error: 'Project is already featured' };
    }
    return { success: false, error: 'Failed to add featured project' };
  }
}

/**
 * Remove a project from featured projects
 */
export async function removeFeaturedProject(featuredProjectId: string) {
  try {
    await prisma.featuredProject.delete({
      where: { id: featuredProjectId },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/featured-projects');

    return { success: true };
  } catch (error) {
    console.error('Error removing featured project:', error);
    return { success: false, error: 'Failed to remove featured project' };
  }
}

/**
 * Toggle enabled status of a featured project
 */
export async function toggleFeaturedProject(featuredProjectId: string, enabled: boolean) {
  try {
    const featuredProject = await prisma.featuredProject.update({
      where: { id: featuredProjectId },
      data: { enabled },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/featured-projects');

    return { success: true, data: featuredProject };
  } catch (error) {
    console.error('Error toggling featured project:', error);
    return { success: false, error: 'Failed to toggle featured project' };
  }
}

/**
 * Reorder featured projects (for drag & drop)
 */
export async function reorderFeaturedProjects(reorderedIds: string[]) {
  try {
    // Update order for each project in a transaction
    await prisma.$transaction(
      reorderedIds.map((id, index) =>
        prisma.featuredProject.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath('/');
    revalidatePath('/admin/dashboard/featured-projects');

    return { success: true };
  } catch (error) {
    console.error('Error reordering featured projects:', error);
    return { success: false, error: 'Failed to reorder featured projects' };
  }
}

/**
 * Get all projects that are not currently featured
 */
export async function getAvailableProjects() {
  try {
    const featuredProjectIds = await prisma.featuredProject.findMany({
      select: { projectId: true },
    });

    const featuredIds = featuredProjectIds.map((fp) => fp.projectId);

    const availableProjects = await prisma.project.findMany({
      where: {
        id: {
          notIn: featuredIds,
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        featuredImage: true,
        location: true,
        year: true,
        status: true,
        typology: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: availableProjects };
  } catch (error) {
    console.error('Error fetching available projects:', error);
    return { success: false, error: 'Failed to fetch available projects', data: [] };
  }
}
