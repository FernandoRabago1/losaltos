import { getTags } from '@/lib/actions/tags';
import TagManager from '@/components/admin/TagManager';

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Gestión de Etiquetas
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Administra las etiquetas que aparecen en el buscador global.
            Puedes habilitar, deshabilitar, crear y eliminar etiquetas.
          </p>
        </div>

        <TagManager tags={tags} />
      </div>
    </div>
  );
}
