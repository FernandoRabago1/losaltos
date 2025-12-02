'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProject, updateProject } from '@/lib/actions/projects';
import { AlertCircle, CheckCircle2, Loader2, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { locales, type Locale } from '@/lib/i18n/config';

interface Tag {
  id: string;
  name: string;
  enabled: boolean;
}

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  location: string;
  year: string;
  status: string;
  typology: string;
  shortDescription: string;
  description: string;
  images: string;
  featuredImage: string;
  tags: string | null;
  area: string | null;
  client: string | null;
  team: string | null;
  featured: boolean;
  popular: boolean;
}

interface ProjectFormProps {
  project?: ProjectData;
  availableTags?: Tag[];
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {isEdit ? 'Updating...' : 'Creating...'}
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          {isEdit ? 'Update Project' : 'Create Project'}
        </>
      )}
    </button>
  );
}

export default function ProjectForm({ project, availableTags = [] }: ProjectFormProps) {
  const isEdit = !!project;
  const router = useRouter();

  const [state, formAction] = useActionState(
    isEdit ? updateProject.bind(null, project.id) : createProject,
    undefined,
  );

  const [images, setImages] = useState<string[]>(() => {
    if (!project?.images) return [];
    try {
      return JSON.parse(project.images);
    } catch {
      return [];
    }
  });
  const [newImage, setNewImage] = useState('');
  const [featuredImage, setFeaturedImage] = useState(
    project?.featuredImage || '',
  );
  const [teamMembers, setTeamMembers] = useState<Array<{ role: string; members: string[] }>>(() => {
    if (!project?.team) return [];
    try {
      return JSON.parse(project.team);
    } catch {
      return [];
    }
  });
  const [newTeamRole, setNewTeamRole] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (!project?.tags) return [];
    try {
      const parsed = JSON.parse(project.tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return project.tags ? project.tags.split(',').map((t: string) => t.trim()) : [];
    }
  });

  // Multi-language translations state
  const [translations, setTranslations] = useState<Record<Locale, { title: string; shortDescription: string; description: string }>>(() => {
    const initial: Record<Locale, { title: string; shortDescription: string; description: string }> = {
      es: { title: project?.title || '', shortDescription: project?.shortDescription || '', description: project?.description || '' },
      en: { title: '', shortDescription: '', description: '' },
      zh: { title: '', shortDescription: '', description: '' },
      ja: { title: '', shortDescription: '', description: '' },
      pt: { title: '', shortDescription: '', description: '' },
    };
    return initial;
  });

  const handleTranslationChange = (locale: Locale, field: 'title' | 'shortDescription' | 'description', value: string) => {
    setTranslations(prev => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/admin/dashboard/projects');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  const handleAddImage = () => {
    if (newImage && !images.includes(newImage)) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddTeamMember = () => {
    if (newTeamRole && newTeamMembers) {
      const members = newTeamMembers.split(',').map((m) => m.trim()).filter((m) => m);
      setTeamMembers([...teamMembers, { role: newTeamRole, members }]);
      setNewTeamRole('');
      setNewTeamMembers('');
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleToggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Prevent form submission on Enter key, except for textareas
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <form action={formAction} className="space-y-6" onKeyDown={handleKeyDown}>
      {/* Success Message */}
      {state?.success && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <p>{state.message} Redirecting...</p>
        </div>
      )}

      {/* Error Message */}
      {state?.message && !state?.success && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">
          Basic Information
        </h3>

        {/* Multi-language Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Title (All Languages)
          </label>
          <Tabs defaultValue="es" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="es">ES</TabsTrigger>
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="zh">中文</TabsTrigger>
              <TabsTrigger value="ja">日本語</TabsTrigger>
              <TabsTrigger value="pt">PT</TabsTrigger>
            </TabsList>
            {locales.map((locale) => (
              <TabsContent key={locale} value={locale} className="mt-3">
                <input
                  type="text"
                  value={translations[locale].title}
                  onChange={(e) => handleTranslationChange(locale, 'title', e.target.value)}
                  required={locale === 'es'}
                  placeholder={`Title in ${locale.toUpperCase()}`}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </TabsContent>
            ))}
          </Tabs>
          <input type="hidden" name="title" value={translations.es.title} />
          {locales.filter(l => l !== 'es').map((locale) => (
            <input
              key={locale}
              type="hidden"
              name={`translations[${locale}][title]`}
              value={translations[locale].title}
            />
          ))}
          {state?.errors?.title && (
            <p className="mt-1 text-xs text-red-600">{state.errors.title[0]}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Slug (URL-friendly)
          </label>
          <input
            type="text"
            name="slug"
            defaultValue={project?.slug}
            required
            pattern="[a-z0-9\-]+"
            placeholder="modern-residence-hills"
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          {state?.errors?.slug && (
            <p className="mt-1 text-xs text-red-600">{state.errors.slug[0]}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={project?.location}
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.errors?.location && (
              <p className="mt-1 text-xs text-red-600">
                {state.errors.location[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Year
            </label>
            <input
              type="text"
              name="year"
              defaultValue={project?.year}
              required
              placeholder="2024"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            {state?.errors?.year && (
              <p className="mt-1 text-xs text-red-600">{state.errors.year[0]}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Status
            </label>
            <select
              name="status"
              defaultValue={project?.status || 'concept'}
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            >
              <option value="concept">Concepto</option>
              <option value="diseño">Diseño</option>
              <option value="construcción">Construcción</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Typology
            </label>
            <select
              name="typology"
              defaultValue={project?.typology || 'residencial'}
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            >
              <option value="industrial">Industrial</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
        </div>

        {/* Multi-language Short Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Short Description (All Languages)
          </label>
          <Tabs defaultValue="es" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="es">ES</TabsTrigger>
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="zh">中文</TabsTrigger>
              <TabsTrigger value="ja">日本語</TabsTrigger>
              <TabsTrigger value="pt">PT</TabsTrigger>
            </TabsList>
            {locales.map((locale) => (
              <TabsContent key={locale} value={locale} className="mt-3">
                <textarea
                  value={translations[locale].shortDescription}
                  onChange={(e) => handleTranslationChange(locale, 'shortDescription', e.target.value)}
                  required={locale === 'es'}
                  rows={2}
                  placeholder={`Short description in ${locale.toUpperCase()}`}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </TabsContent>
            ))}
          </Tabs>
          <input type="hidden" name="shortDescription" value={translations.es.shortDescription} />
          {locales.filter(l => l !== 'es').map((locale) => (
            <input
              key={locale}
              type="hidden"
              name={`translations[${locale}][shortDescription]`}
              value={translations[locale].shortDescription}
            />
          ))}
          {state?.errors?.shortDescription && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.shortDescription[0]}
            </p>
          )}
        </div>

        {/* Multi-language Full Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Full Description (All Languages)
          </label>
          <Tabs defaultValue="es" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="es">ES</TabsTrigger>
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="zh">中文</TabsTrigger>
              <TabsTrigger value="ja">日本語</TabsTrigger>
              <TabsTrigger value="pt">PT</TabsTrigger>
            </TabsList>
            {locales.map((locale) => (
              <TabsContent key={locale} value={locale} className="mt-3">
                <textarea
                  value={translations[locale].description}
                  onChange={(e) => handleTranslationChange(locale, 'description', e.target.value)}
                  required={locale === 'es'}
                  rows={6}
                  placeholder={`Full description in ${locale.toUpperCase()}`}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </TabsContent>
            ))}
          </Tabs>
          <input type="hidden" name="description" value={translations.es.description} />
          {locales.filter(l => l !== 'es').map((locale) => (
            <input
              key={locale}
              type="hidden"
              name={`translations[${locale}][description]`}
              value={translations[locale].description}
            />
          ))}
          {state?.errors?.description && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.description[0]}
            </p>
          )}
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4 border-t border-zinc-200 pt-6">
        <h3 className="text-lg font-semibold text-zinc-900">
          Additional Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Area (optional)
            </label>
            <input
              type="text"
              name="area"
              defaultValue={project?.area || ''}
              placeholder="5,500 sq ft"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Client (optional)
            </label>
            <input
              type="text"
              name="client"
              defaultValue={project?.client || ''}
              placeholder="Private Client"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Etiquetas del Proyecto (opcional)
          </label>
          {availableTags.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.name)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                      selectedTags.includes(tag.name)
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="rounded-lg bg-zinc-50 p-3">
                  <p className="text-xs font-medium text-zinc-700 mb-2">
                    Etiquetas seleccionadas:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No hay etiquetas disponibles. Ve a Gestión de Etiquetas para crear algunas.
            </p>
          )}
          <input
            type="hidden"
            name="tags"
            value={JSON.stringify(selectedTags)}
          />
          <p className="mt-2 text-xs text-zinc-500">
            Selecciona las etiquetas que describen este proyecto. Se usarán en el buscador global.
          </p>
        </div>

        {/* Project Team */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Equipo del Proyecto (opcional)
          </label>

          <div className="mb-3 grid gap-4 sm:grid-cols-2">
            <div>
              <input
                type="text"
                value={newTeamRole}
                onChange={(e) => setNewTeamRole(e.target.value)}
                placeholder="Rol (ej: Arquitecto Principal)"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTeamMembers}
                onChange={(e) => setNewTeamMembers(e.target.value)}
                placeholder="Miembros (separados por comas)"
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
              <button
                type="button"
                onClick={handleAddTeamMember}
                className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
              >
                <Upload className="h-4 w-4" />
                Agregar
              </button>
            </div>
          </div>

          {teamMembers.length > 0 && (
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              {teamMembers.map((team, index) => (
                <div
                  key={index}
                  className="group flex items-start justify-between rounded-lg bg-white p-3 transition-all hover:shadow-sm"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900">{team.role}</p>
                    <p className="text-xs text-zinc-600">{team.members.join(', ')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeamMember(index)}
                    className="rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <Upload className="h-3 w-3 rotate-180" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="hidden"
            name="team"
            value={teamMembers.length > 0 ? JSON.stringify(teamMembers) : ''}
          />
          <p className="mt-2 text-xs text-zinc-500">
            Agrega roles y miembros del equipo. Ejemplo: &quot;Arquitecto Principal&quot; → &quot;John Doe, Jane Smith&quot;
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              value="true"
              defaultChecked={project?.featured}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
            <label htmlFor="featured" className="text-sm font-medium text-zinc-700">
              Featured Project (Aparece en homepage)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="popular"
              id="popular"
              value="true"
              defaultChecked={project?.popular}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
            <label htmlFor="popular" className="text-sm font-medium text-zinc-700">
              Popular (Aparece en búsqueda global)
            </label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4 border-t border-zinc-200 pt-6">
        <h3 className="text-lg font-semibold text-zinc-900">Images</h3>

        {/* Featured Image Upload */}
        <div>
          <ImageUpload
            label="Featured Image (Imagen Principal)"
            currentImage={featuredImage}
            onUploadComplete={(url) => setFeaturedImage(url)}
            aspectRatio="16:9"
            showFullPreview={true}
          />
          <input
            type="hidden"
            name="featuredImage"
            value={featuredImage}
            required
          />
          {state?.errors?.featuredImage && (
            <p className="mt-1 text-xs text-red-600">
              {state.errors.featuredImage[0]}
            </p>
          )}
          <p className="mt-2 text-xs text-zinc-500">
            Or enter URL manually:
          </p>
          <input
            type="text"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="/uploads/image.png"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>

        {/* Gallery Images */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Gallery Images
          </label>

          <div className="mb-4">
            <ImageUpload
              label="Upload Gallery Image (Galería)"
              onUploadComplete={(url) => {
                if (!images.includes(url)) {
                  setImages([...images, url]);
                }
              }}
              aspectRatio="4:3"
              showFullPreview={true}
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Or enter URL: /uploads/image.png"
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
            >
              <Upload className="h-4 w-4" />
              Add URL
            </button>
          </div>

          {images.length > 0 && (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border-2 border-zinc-200 bg-zinc-50"
                >
                  <div className="relative h-64 w-full">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <Upload className="h-3 w-3 rotate-180" />
                  </button>
                  <div className="px-2 py-1.5">
                    <p className="truncate text-xs text-zinc-600">{img}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <input type="hidden" name="images" value={JSON.stringify(images)} />
          {state?.errors?.images && (
            <p className="mt-1 text-xs text-red-600">{state.errors.images[0]}</p>
          )}
          <p className="mt-2 text-xs text-zinc-500">
            Upload images or add URLs manually. Images will be displayed in the project gallery.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end border-t border-zinc-200 pt-6">
        <SubmitButton isEdit={isEdit} />
      </div>
    </form>
  );
}
