'use client';

import { useState } from 'react';
import { toggleCategory } from '@/lib/actions/categories';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface CategoryManagerProps {
  categories: Category[];
}

export default function CategoryManager({ categories: initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleToggle = async (id: string, currentEnabled: boolean) => {
    setLoading(id);
    setMessage(null);

    const result = await toggleCategory(id, !currentEnabled);

    if (result.success) {
      setCategories(
        categories.map((cat) =>
          cat.id === id ? { ...cat, enabled: !currentEnabled } : cat
        )
      );
      setMessage({ type: 'success', text: result.message });
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setLoading(null);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Success/Error Message */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* Categories List */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
        <div className="divide-y divide-zinc-200">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-6 transition-colors hover:bg-zinc-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    category.enabled
                      ? 'bg-green-100 text-green-600'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  {category.enabled ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <XCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Slug: <code className="rounded bg-zinc-100 px-1.5 py-0.5">{category.slug}</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleToggle(category.id, category.enabled)}
                disabled={loading === category.id}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  category.enabled ? 'bg-green-600' : 'bg-zinc-300'
                }`}
              >
                {loading === category.id ? (
                  <Loader2 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin text-white" />
                ) : (
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      category.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">
              ¿Cómo funciona?
            </h4>
            <p className="mt-1 text-sm text-blue-700">
              Cuando deshabilitas una categoría, automáticamente se oculta en:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Navegación principal (navbar)</li>
              <li>• Footer del sitio</li>
              <li>• Filtros de la página de inicio</li>
              <li>• Filtros de la página de proyectos</li>
            </ul>
            <p className="mt-2 text-sm text-blue-700">
              Los proyectos existentes con esa categoría permanecerán en la base de datos,
              pero solo serán visibles cuando la categoría esté habilitada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
