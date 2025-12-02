import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getFeaturedProjects,
  getEnabledFeaturedProjects,
  addFeaturedProject,
  removeFeaturedProject,
  toggleFeaturedProject,
  reorderFeaturedProjects,
  getAvailableProjects,
} from '@/lib/actions/featured-projects';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    featuredProject: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
    project: {
      findMany: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

// Mock Next.js revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

import { prisma } from '@/lib/prisma';

describe('Featured Projects Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getFeaturedProjects', () => {
    it('should return all featured projects ordered by order field', async () => {
      const mockData = [
        {
          id: '1',
          projectId: 'p1',
          order: 0,
          enabled: true,
          project: {
            id: 'p1',
            slug: 'project-1',
            title: 'Project 1',
            featuredImage: '/image1.jpg',
            location: 'LA',
            year: '2024',
            status: 'completado',
            typology: 'residencial',
            shortDescription: 'Test project',
          },
        },
        {
          id: '2',
          projectId: 'p2',
          order: 1,
          enabled: false,
          project: {
            id: 'p2',
            slug: 'project-2',
            title: 'Project 2',
            featuredImage: '/image2.jpg',
            location: 'SF',
            year: '2023',
            status: 'en progreso',
            typology: 'comercial',
            shortDescription: 'Test project 2',
          },
        },
      ];

      vi.mocked(prisma.featuredProject.findMany).mockResolvedValue(mockData as any);

      const result = await getFeaturedProjects();

      expect(result).toHaveLength(2);
      expect(result[0].order).toBe(0);
      expect(result[1].order).toBe(1);
      expect(prisma.featuredProject.findMany).toHaveBeenCalledWith({
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
    });

    it('should return empty array on error', async () => {
      vi.mocked(prisma.featuredProject.findMany).mockRejectedValue(new Error('DB Error'));

      const result = await getFeaturedProjects();

      expect(result).toEqual([]);
    });
  });

  describe('getEnabledFeaturedProjects', () => {
    it('should return only enabled featured projects', async () => {
      const mockData = [
        {
          id: '1',
          projectId: 'p1',
          order: 0,
          enabled: true,
          project: {
            id: 'p1',
            slug: 'project-1',
            title: 'Project 1',
            featuredImage: '/image1.jpg',
            location: 'LA',
            year: '2024',
            status: 'completado',
            typology: 'residencial',
            shortDescription: 'Test',
          },
        },
      ];

      vi.mocked(prisma.featuredProject.findMany).mockResolvedValue(mockData as any);

      const result = await getEnabledFeaturedProjects();

      expect(result).toHaveLength(1);
      expect(result[0].enabled).toBe(true);
      expect(prisma.featuredProject.findMany).toHaveBeenCalledWith({
        where: { enabled: true },
        orderBy: { order: 'asc' },
        include: expect.any(Object),
      });
    });
  });

  describe('addFeaturedProject', () => {
    it('should add a new featured project with correct order', async () => {
      vi.mocked(prisma.featuredProject.findFirst).mockResolvedValue({ order: 2 } as any);
      vi.mocked(prisma.featuredProject.create).mockResolvedValue({
        id: '3',
        projectId: 'p3',
        order: 3,
        enabled: true,
      } as any);

      const result = await addFeaturedProject('p3');

      expect(result.success).toBe(true);
      expect(prisma.featuredProject.create).toHaveBeenCalledWith({
        data: {
          projectId: 'p3',
          order: 3,
          enabled: true,
        },
      });
    });

    it('should handle duplicate project error', async () => {
      const error: any = new Error('Unique constraint');
      error.code = 'P2002';
      vi.mocked(prisma.featuredProject.findFirst).mockResolvedValue({ order: 0 } as any);
      vi.mocked(prisma.featuredProject.create).mockRejectedValue(error);

      const result = await addFeaturedProject('p1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Project is already featured');
    });

    it('should assign order 0 when no featured projects exist', async () => {
      vi.mocked(prisma.featuredProject.findFirst).mockResolvedValue(null);
      vi.mocked(prisma.featuredProject.create).mockResolvedValue({
        id: '1',
        projectId: 'p1',
        order: 0,
        enabled: true,
      } as any);

      await addFeaturedProject('p1');

      expect(prisma.featuredProject.create).toHaveBeenCalledWith({
        data: {
          projectId: 'p1',
          order: 0,
          enabled: true,
        },
      });
    });
  });

  describe('removeFeaturedProject', () => {
    it('should remove a featured project', async () => {
      vi.mocked(prisma.featuredProject.delete).mockResolvedValue({} as any);

      const result = await removeFeaturedProject('1');

      expect(result.success).toBe(true);
      expect(prisma.featuredProject.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should handle delete error', async () => {
      vi.mocked(prisma.featuredProject.delete).mockRejectedValue(new Error('Not found'));

      const result = await removeFeaturedProject('999');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to remove featured project');
    });
  });

  describe('toggleFeaturedProject', () => {
    it('should toggle enabled status', async () => {
      vi.mocked(prisma.featuredProject.update).mockResolvedValue({
        id: '1',
        enabled: false,
      } as any);

      const result = await toggleFeaturedProject('1', false);

      expect(result.success).toBe(true);
      expect(prisma.featuredProject.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { enabled: false },
      });
    });
  });

  describe('reorderFeaturedProjects', () => {
    it('should update order for all projects in transaction', async () => {
      const ids = ['1', '2', '3'];
      vi.mocked(prisma.$transaction).mockResolvedValue([]);

      const result = await reorderFeaturedProjects(ids);

      expect(result.success).toBe(true);
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should handle reorder error', async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue(new Error('Transaction failed'));

      const result = await reorderFeaturedProjects(['1', '2']);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to reorder featured projects');
    });
  });

  describe('getAvailableProjects', () => {
    it('should return projects not in featured list', async () => {
      vi.mocked(prisma.featuredProject.findMany).mockResolvedValue([
        { projectId: 'p1' } as any,
        { projectId: 'p2' } as any,
      ]);

      vi.mocked(prisma.project.findMany).mockResolvedValue([
        {
          id: 'p3',
          slug: 'project-3',
          title: 'Project 3',
          featuredImage: '/image3.jpg',
          location: 'SD',
          year: '2024',
          status: 'completado',
          typology: 'industrial',
        },
      ] as any);

      const result = await getAvailableProjects();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].id).toBe('p3');
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            notIn: ['p1', 'p2'],
          },
        },
        select: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should handle error and return empty data', async () => {
      vi.mocked(prisma.featuredProject.findMany).mockRejectedValue(new Error('DB Error'));

      const result = await getAvailableProjects();

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
    });
  });
});
