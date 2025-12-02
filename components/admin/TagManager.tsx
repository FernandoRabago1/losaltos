'use client';

import { useState } from 'react';
import { toggleTag, createTag, deleteTag } from '@/lib/actions/tags';
import { CheckCircle2, XCircle, Loader2, Plus, Trash2 } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface TagManagerProps {
  tags: Tag[];
}

export default function TagManager({ tags: initialTags }: TagManagerProps) {
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggle = async (id: string, currentEnabled: boolean) => {
    setLoading(id);
    const result = await toggleTag(id, !currentEnabled);

    if (result.success) {
      setTags(tags.map((tag) => (tag.id === id ? { ...tag, enabled: !currentEnabled } : tag)));
      showMessage('success', result.message);
    } else {
      showMessage('error', result.message);
    }

    setLoading(null);
  };

  const handleCreate = async () => {
    if (!newTagName.trim()) {
      showMessage('error', 'El nombre del tag no puede estar vacío');
      return;
    }

    setIsCreating(true);
    const result = await createTag(newTagName.trim());

    if (result.success) {
      showMessage('success', result.message);
      setNewTagName('');
      // Refresh the page to get updated tags
      window.location.reload();
    } else {
      showMessage('error', result.message);
    }

    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este tag?')) {
      return;
    }

    setLoading(id);
    const result = await deleteTag(id);

    if (result.success) {
      setTags(tags.filter((tag) => tag.id !== id));
      showMessage('success', result.message);
    } else {
      showMessage('error', result.message);
    }

    setLoading(null);
  };

  return (
    <div className="space-y-6">
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

      {/* Create New Tag */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">Crear Nueva Etiqueta</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Nombre de la etiqueta..."
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            disabled={isCreating}
          />
          <button
            onClick={handleCreate}
            disabled={isCreating || !newTagName.trim()}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Crear
          </button>
        </div>
      </div>

      {/* Tags List */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
        <div className="divide-y divide-zinc-200">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-6 transition-colors hover:bg-zinc-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    tag.enabled
                      ? 'bg-green-100 text-green-600'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  {tag.enabled ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <XCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">{tag.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {tag.enabled ? 'Visible en búsqueda' : 'Oculto'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(tag.id, tag.enabled)}
                  disabled={loading === tag.id}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    tag.enabled ? 'bg-green-600' : 'bg-zinc-300'
                  }`}
                >
                  {loading === tag.id ? (
                    <Loader2 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin text-white" />
                  ) : (
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tag.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  )}
                </button>

                <button
                  onClick={() => handleDelete(tag.id)}
                  disabled={loading === tag.id}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Eliminar tag"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
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
            <h4 className="font-semibold text-blue-900">¿Cómo funciona?</h4>
            <p className="mt-1 text-sm text-blue-700">
              Las etiquetas habilitadas aparecen en el buscador global para filtrar proyectos.
              Puedes crear nuevas etiquetas, habilitarlas/deshabilitarlas, o eliminarlas.
            </p>
            <p className="mt-2 text-sm text-blue-700">
              <strong>Nota:</strong> Los proyectos deben tener estas etiquetas en su campo &quot;tags&quot;
              para que aparezcan al filtrar por etiqueta en el buscador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
