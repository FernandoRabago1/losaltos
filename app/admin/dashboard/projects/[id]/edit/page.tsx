import ProjectForm from '@/components/admin/ProjectForm';
import { getProject } from '@/lib/actions/projects';
import { getTags } from '@/lib/actions/tags';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  const tags = await getTags();

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/projects"
          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Edit Project</h1>
          <p className="mt-2 text-zinc-600">{project.title}</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
        <ProjectForm project={project} availableTags={tags} />
      </div>
    </div>
  );
}
