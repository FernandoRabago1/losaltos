import { getCategories } from '@/lib/actions/categories';
import CategoryManager from '@/components/admin/CategoryManager';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Gestión de Categorías
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Habilita o deshabilita categorías para controlar qué aparece en tu sitio web.
            Las categorías deshabilitadas no se mostrarán en el navbar, footer ni filtros.
          </p>
        </div>

        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
