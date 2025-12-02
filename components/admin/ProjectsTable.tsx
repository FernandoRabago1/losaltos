'use client';

import { useState, useMemo } from 'react';
import { Plus, Pencil, ExternalLink, Filter, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  status: string;
  typology: string;
  featuredImage: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const [filters, setFilters] = useState({
    location: '',
    status: '',
    typology: '',
    year: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    return {
      locations: Array.from(new Set(projects.map((p) => p.location))).sort(),
      statuses: Array.from(new Set(projects.map((p) => p.status))).sort(),
      typologies: Array.from(new Set(projects.map((p) => p.typology))).sort(),
      years: Array.from(new Set(projects.map((p) => p.year))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    };
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (filters.location && project.location !== filters.location)
        return false;
      if (filters.status && project.status !== filters.status) return false;
      if (filters.typology && project.typology !== filters.typology)
        return false;
      if (filters.year && project.year !== filters.year) return false;
      return true;
    });
  }, [projects, filters]);

  const clearFilters = () => {
    setFilters({
      location: '',
      status: '',
      typology: '',
      year: '',
    });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Projects</h1>
          <p className="mt-2 text-zinc-600">
            Manage your architecture projects
            {activeFilterCount > 0 && (
              <span className="ml-2 text-sm text-zinc-500">
                ({filteredProjects.length} of {projects.length})
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <Link
            href="/admin/dashboard/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Filter Projects
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Location Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                <option value="">All Locations</option>
                {filterOptions.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                <option value="">All Statuses</option>
                <option value="completado">Completed</option>
                <option value="en progreso">In Progress</option>
                <option value="concept">Concept</option>
              </select>
            </div>

            {/* Typology Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Typology
              </label>
              <select
                value={filters.typology}
                onChange={(e) =>
                  setFilters({ ...filters, typology: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                <option value="">All Typologies</option>
                {filterOptions.typologies.map((typology) => (
                  <option key={typology} value={typology}>
                    {typology.charAt(0).toUpperCase() + typology.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                <option value="">All Years</option>
                {filterOptions.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
        {filteredProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <h3 className="text-sm font-medium text-zinc-900">
              {activeFilterCount > 0 ? 'No projects match your filters' : 'No projects yet'}
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              {activeFilterCount > 0
                ? 'Try adjusting your filters or clear them to see all projects.'
                : 'Get started by creating your first project.'}
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-200 bg-zinc-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Typology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Year
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="transition-colors hover:bg-zinc-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Thumbnail Image */}
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                          <Image
                            src={project.featuredImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-zinc-900">
                            {project.title}
                          </div>
                          <div className="mt-1 text-sm text-zinc-500">
                            {project.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {project.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          project.status === 'completado'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'en progreso'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {project.status === 'completado'
                          ? 'Completed'
                          : project.status === 'en progreso'
                          ? 'In Progress'
                          : 'Concept'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm capitalize text-zinc-600">
                      {project.typology}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {project.year}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100"
                          title="View on site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/dashboard/projects/${project.id}/edit`}
                          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteProjectButton id={project.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
