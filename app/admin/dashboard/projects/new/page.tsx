import ProjectForm from '@/components/admin/ProjectForm';
import { getTags } from '@/lib/actions/tags';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewProjectPage() {
  const tags = await getTags();

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
          <h1 className="text-3xl font-bold text-zinc-900">New Project</h1>
          <p className="mt-2 text-zinc-600">Create a new architecture project</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
        <ProjectForm availableTags={tags} />
      </div>
    </div>
  );
}
