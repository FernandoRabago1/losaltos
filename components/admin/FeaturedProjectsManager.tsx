'use client';

import { useState } from 'react';
import { Eye, EyeOff, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  addFeaturedProject,
  removeFeaturedProject,
  toggleFeaturedProject,
  reorderFeaturedProjects,
} from '@/lib/actions/featured-projects';
import type { FeaturedProjectWithDetails } from '@/lib/actions/featured-projects';

interface FeaturedProjectsManagerProps {
  initialFeaturedProjects: FeaturedProjectWithDetails[];
  availableProjects: Array<{
    id: string;
    title: string;
    featuredImage: string;
    location: string;
    year: string;
    status: string;
    typology: string;
  }>;
}

export default function FeaturedProjectsManager({
  initialFeaturedProjects,
  availableProjects,
}: FeaturedProjectsManagerProps) {
  const [featuredProjects, setFeaturedProjects] = useState(initialFeaturedProjects);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    const result = await toggleFeaturedProject(id, !currentStatus);
    if (result.success) {
      setFeaturedProjects((prev) =>
        prev.map((fp) => (fp.id === id ? { ...fp, enabled: !currentStatus } : fp))
      );
      toast.success(`Project ${!currentStatus ? 'shown' : 'hidden'}`);
    } else {
      toast.error('Failed to update visibility');
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm('Remove this project from featured?')) return;

    const result = await removeFeaturedProject(id);
    if (result.success) {
      setFeaturedProjects((prev) => prev.filter((fp) => fp.id !== id));
      toast.success('Project removed');
    } else {
      toast.error('Failed to remove project');
    }
  };

  const handleAdd = async (projectId: string) => {
    setIsLoading(true);
    const result = await addFeaturedProject(projectId);
    if (result.success) {
      window.location.reload();
    } else {
      toast.error(result.error || 'Failed to add project');
    }
    setIsLoading(false);
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newOrder = [...featuredProjects];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];

    setFeaturedProjects(newOrder);

    const result = await reorderFeaturedProjects(newOrder.map((fp) => fp.id));
    if (result.success) {
      toast.success('Order updated');
    } else {
      setFeaturedProjects(featuredProjects);
      toast.error('Failed to reorder');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === featuredProjects.length - 1) return;

    const newOrder = [...featuredProjects];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];

    setFeaturedProjects(newOrder);

    const result = await reorderFeaturedProjects(newOrder.map((fp) => fp.id));
    if (result.success) {
      toast.success('Order updated');
    } else {
      setFeaturedProjects(featuredProjects);
      toast.error('Failed to reorder');
    }
  };

  return (
    <div className="space-y-8">
      {/* Featured Projects List */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
          Featured Projects ({featuredProjects.length})
        </h2>

        {featuredProjects.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 rounded-lg">
            <p className="text-zinc-600">No featured projects yet. Add some from below.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {featuredProjects.map((fp, index) => (
              <div
                key={fp.id}
                className={`flex items-center gap-4 p-4 bg-white border rounded-lg ${
                  !fp.enabled ? 'opacity-50' : ''
                }`}
              >
                {/* Order Badge */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-zinc-100 rounded disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === featuredProjects.length - 1}
                    className="p-1 hover:bg-zinc-100 rounded disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={fp.project.featuredImage}
                    alt={fp.project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-zinc-900 truncate">{fp.project.title}</h3>
                  <p className="text-sm text-zinc-500">
                    {fp.project.location} • {fp.project.year}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVisibility(fp.id, fp.enabled)}
                    className="p-2 hover:bg-zinc-100 rounded"
                    title={fp.enabled ? 'Hide project' : 'Show project'}
                  >
                    {fp.enabled ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-zinc-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRemove(fp.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Projects */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
          Available Projects ({availableProjects.length})
        </h2>

        {availableProjects.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 rounded-lg">
            <p className="text-zinc-600">All projects are featured!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableProjects.map((project) => (
              <div key={project.id} className="bg-white border rounded-lg overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-zinc-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-zinc-500 mb-3">
                    {project.location} • {project.year}
                  </p>
                  <button
                    onClick={() => handleAdd(project.id)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Featured
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
