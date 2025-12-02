'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getEnabledCategories() {
  try {
    // Get all enabled categories
    const categories = await prisma.category.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
    });

    // Get all existing project typologies
    const projects = await prisma.project.findMany({
      select: { typology: true },
      distinct: ['typology'],
    });

    const usedTypologies = new Set(projects.map(p => p.typology));

    // Filter categories to only include those with existing projects
    const categoriesWithProjects = categories.filter(category =>
      usedTypologies.has(category.slug)
    );

    return categoriesWithProjects;
  } catch (error) {
    console.error('Error fetching enabled categories:', error);
    return [];
  }
}

export async function toggleCategory(id: string, enabled: boolean) {
  try {
    await prisma.category.update({
      where: { id },
      data: { enabled },
    });

    // Revalidate all pages that use categories
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/dashboard/categories');

    return { success: true, message: 'Categoría actualizada exitosamente' };
  } catch (error) {
    console.error('Error toggling category:', error);
    return { success: false, message: 'Error al actualizar la categoría' };
  }
}

export async function updateCategoryOrder(id: string, order: number) {
  try {
    await prisma.category.update({
      where: { id },
      data: { order },
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/dashboard/categories');

    return { success: true, message: 'Orden actualizado exitosamente' };
  } catch (error) {
    console.error('Error updating category order:', error);
    return { success: false, message: 'Error al actualizar el orden' };
  }
}
