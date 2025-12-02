'use client';

import { Trash2 } from 'lucide-react';
import { deleteProject } from '@/lib/actions/projects';
import { useState } from 'react';

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this project? This action cannot be undone.',
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProject(id);
    } catch {
      alert('Failed to delete project');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
