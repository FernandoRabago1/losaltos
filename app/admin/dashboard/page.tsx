import { prisma } from '@/lib/db';
import { BarChart3, FolderKanban, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const [totalProjects, completedProjects, inProgressProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'completado' } }),
      prisma.project.count({ where: { status: 'en progreso' } }),
    ]);

  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
    conceptProjects: totalProjects - completedProjects - inProgressProjects,
  };
}

async function getRecentProjects() {
  return await prisma.project.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
  });
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentProjects = await getRecentProjects();

  const statCards = [
    {
      name: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      name: 'Completed',
      value: stats.completedProjects,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'In Progress',
      value: stats.inProgressProjects,
      icon: BarChart3,
      color: 'bg-yellow-500',
    },
    {
      name: 'Concepts',
      value: stats.conceptProjects,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-2 text-zinc-600">
          Welcome back! Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-zinc-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Projects
          </h2>
          <Link
            href="/admin/dashboard/projects"
            className="text-sm font-medium text-zinc-900 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FolderKanban className="mx-auto h-12 w-12 text-zinc-400" />
            <h3 className="mt-4 text-sm font-medium text-zinc-900">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Get started by creating your first project.
            </p>
            <Link
              href="/admin/dashboard/projects/new"
              className="mt-4 inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/admin/dashboard/projects/${project.id}`}
                className="block px-6 py-4 transition-colors hover:bg-zinc-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-900">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      {project.location} • {project.year}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
