'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ProjectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  year: z.string().min(1, 'Year is required'),
  status: z.enum(['completado', 'en progreso', 'concept', 'diseño', 'construcción']),
  typology: z.enum([
    'industrial',
    'residencial',
    'comercial',
  ]),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  images: z.string().min(1, 'At least one image is required'),
  featuredImage: z.string().min(1, 'Featured image is required'),
  tags: z.string().optional(),
  area: z.string().optional(),
  client: z.string().optional(),
  team: z.string().optional(),
  featured: z.boolean().default(false),
  popular: z.boolean().default(false),
});

interface ProjectState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

export async function createProject(prevState: ProjectState | undefined, formData: FormData): Promise<ProjectState> {
  const formDataObj = {
    slug: formData.get('slug'),
    title: formData.get('title'),
    location: formData.get('location'),
    year: formData.get('year'),
    status: formData.get('status'),
    typology: formData.get('typology'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    images: formData.get('images'),
    featuredImage: formData.get('featuredImage'),
    tags: formData.get('tags'),
    area: formData.get('area'),
    client: formData.get('client'),
    team: formData.get('team'),
    featured: formData.get('featured') === 'true',
    popular: formData.get('popular') === 'true',
  };

  console.log('Form Data Object:', formDataObj);

  const validatedFields = ProjectSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    console.log('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields.',
    };
  }

  const data = validatedFields.data;

  try {
    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existingProject) {
      return {
        message: 'A project with this slug already exists.',
      };
    }

    // Create project with translations
    const project = await prisma.project.create({
      data,
    });

    // Save translations for other languages
    const locales = ['en', 'zh', 'ja', 'pt'] as const;
    for (const locale of locales) {
      const title = formData.get(`translations[${locale}][title]`) as string | null;
      const shortDescription = formData.get(`translations[${locale}][shortDescription]`) as string | null;
      const description = formData.get(`translations[${locale}][description]`) as string | null;

      // Only create translation if at least one field is provided
      if (title || shortDescription || description) {
        await prisma.projectTranslation.create({
          data: {
            projectId: project.id,
            locale,
            title: title || data.title, // Fall back to Spanish if not provided
            shortDescription: shortDescription || data.shortDescription,
            description: description || data.description,
          },
        });
      }
    }

    revalidatePath('/admin/dashboard/projects');
    return {
      success: true,
      message: 'Project created successfully!',
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      message: 'Failed to create project.',
    };
  }
}

export async function updateProject(id: string, prevState: ProjectState | undefined, formData: FormData): Promise<ProjectState> {
  const validatedFields = ProjectSchema.safeParse({
    slug: formData.get('slug'),
    title: formData.get('title'),
    location: formData.get('location'),
    year: formData.get('year'),
    status: formData.get('status'),
    typology: formData.get('typology'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    images: formData.get('images'),
    featuredImage: formData.get('featuredImage'),
    tags: formData.get('tags'),
    area: formData.get('area'),
    client: formData.get('client'),
    team: formData.get('team'),
    featured: formData.get('featured') === 'true',
    popular: formData.get('popular') === 'true',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields.',
    };
  }

  const data = validatedFields.data;

  try {
    // Check if slug already exists for another project
    const existingProject = await prisma.project.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existingProject) {
      return {
        message: 'A project with this slug already exists.',
      };
    }

    await prisma.project.update({
      where: { id },
      data,
    });

    // Update translations for other languages
    const locales = ['en', 'zh', 'ja', 'pt'] as const;
    for (const locale of locales) {
      const title = formData.get(`translations[${locale}][title]`) as string | null;
      const shortDescription = formData.get(`translations[${locale}][shortDescription]`) as string | null;
      const description = formData.get(`translations[${locale}][description]`) as string | null;

      // Only update/create translation if at least one field is provided
      if (title || shortDescription || description) {
        await prisma.projectTranslation.upsert({
          where: {
            projectId_locale: {
              projectId: id,
              locale,
            },
          },
          create: {
            projectId: id,
            locale,
            title: title || data.title,
            shortDescription: shortDescription || data.shortDescription,
            description: description || data.description,
          },
          update: {
            title: title || data.title,
            shortDescription: shortDescription || data.shortDescription,
            description: description || data.description,
          },
        });
      }
    }

    revalidatePath('/admin/dashboard/projects');
    revalidatePath(`/admin/dashboard/projects/${id}`);
    return {
      success: true,
      message: 'Project updated successfully!',
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      message: 'Failed to update project.',
    };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project.');
  }

  revalidatePath('/admin/dashboard/projects');
  redirect('/admin/dashboard/projects');
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getPopularProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { popular: true },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    });
    return projects;
  } catch (error) {
    console.error('Error fetching popular projects:', error);
    return [];
  }
}

// Translation helpers
export async function getProjectWithTranslation(id: string, locale: string = 'es') {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    if (!project) return null;

    // If translation exists, merge it with the project
    if (project.translations.length > 0) {
      const translation = project.translations[0];
      return {
        ...project,
        title: translation.title,
        description: translation.description,
        shortDescription: translation.shortDescription,
      };
    }

    // Return original project (Spanish default)
    return project;
  } catch (error) {
    console.error('Error fetching project with translation:', error);
    return null;
  }
}

export async function getAllProjectsWithTranslations(locale: string = 'es') {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    // Map projects with translations
    return projects.map((project) => {
      if (project.translations.length > 0) {
        const translation = project.translations[0];
        return {
          ...project,
          title: translation.title,
          description: translation.description,
          shortDescription: translation.shortDescription,
        };
      }
      return project;
    });
  } catch (error) {
    console.error('Error fetching projects with translations:', error);
    return [];
  }
}

export async function getPopularProjectsWithTranslations(locale: string = 'es') {
  try {
    const projects = await prisma.project.findMany({
      where: { popular: true },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    // Map projects with translations
    return projects.map((project) => {
      if (project.translations.length > 0) {
        const translation = project.translations[0];
        return {
          ...project,
          title: translation.title,
          description: translation.description,
          shortDescription: translation.shortDescription,
        };
      }
      return project;
    });
  } catch (error) {
    console.error('Error fetching popular projects with translations:', error);
    return [];
  }
}
