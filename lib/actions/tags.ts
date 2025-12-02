'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { order: 'asc' },
    });
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getEnabledTags() {
  try {
    const tags = await prisma.tag.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
    });
    return tags;
  } catch (error) {
    console.error('Error fetching enabled tags:', error);
    return [];
  }
}

export async function toggleTag(id: string, enabled: boolean) {
  try {
    await prisma.tag.update({
      where: { id },
      data: { enabled },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/tags');

    return { success: true, message: 'Tag actualizado exitosamente' };
  } catch (error) {
    console.error('Error toggling tag:', error);
    return { success: false, message: 'Error al actualizar el tag' };
  }
}

export async function createTag(name: string) {
  try {
    // Get the highest order number
    const lastTag = await prisma.tag.findFirst({
      orderBy: { order: 'desc' },
    });

    await prisma.tag.create({
      data: {
        name,
        enabled: true,
        order: (lastTag?.order || 0) + 1,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/tags');

    return { success: true, message: 'Tag creado exitosamente' };
  } catch (error) {
    console.error('Error creating tag:', error);
    return { success: false, message: 'Error al crear el tag' };
  }
}

export async function deleteTag(id: string) {
  try {
    await prisma.tag.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/tags');

    return { success: true, message: 'Tag eliminado exitosamente' };
  } catch (error) {
    console.error('Error deleting tag:', error);
    return { success: false, message: 'Error al eliminar el tag' };
  }
}

export async function updateTagOrder(id: string, order: number) {
  try {
    await prisma.tag.update({
      where: { id },
      data: { order },
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/tags');

    return { success: true, message: 'Orden actualizado exitosamente' };
  } catch (error) {
    console.error('Error updating tag order:', error);
    return { success: false, message: 'Error al actualizar el orden' };
  }
}
