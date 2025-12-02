import { getFeaturedProjects, getAvailableProjects } from '@/lib/actions/featured-projects';
import FeaturedProjectsManager from '@/components/admin/FeaturedProjectsManager';

export default async function FeaturedProjectsPage() {
  const featuredProjects = await getFeaturedProjects();
  const { data: availableProjects } = await getAvailableProjects();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Featured Projects</h1>
        <p className="mt-2 text-zinc-600">
          Manage which projects appear in the homepage Featured Projects section.
          Drag and drop to reorder, toggle visibility, and preview how they&apos;ll appear.
        </p>
      </div>

      <FeaturedProjectsManager
        initialFeaturedProjects={featuredProjects}
        availableProjects={availableProjects || []}
      />
    </div>
  );
}
