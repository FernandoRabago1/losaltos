'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Building2,
  Tag,
  Star,
} from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import { motion } from 'framer-motion';

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
  { name: 'Featured Projects', href: '/admin/dashboard/featured-projects', icon: Star },
  { name: 'Categories', href: '/admin/dashboard/categories', icon: Tag },
  { name: 'Tags', href: '/admin/dashboard/tags', icon: Tag },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-zinc-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-6">
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900"
        >
          <Building2 className="h-6 w-6 text-white" />
        </motion.div>
        <div>
          <h1 className="text-sm font-bold text-zinc-900">Architecture</h1>
          <p className="text-xs text-zinc-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-lg'
                  : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-zinc-200 p-4">
        <div className="mb-3 rounded-lg bg-zinc-50 p-3">
          <p className="truncate text-sm font-medium text-zinc-900">
            {user.name || 'Admin User'}
          </p>
          <p className="truncate text-xs text-zinc-500">{user.email}</p>
        </div>
        <form action={logout}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </motion.button>
        </form>
      </div>
    </aside>
  );
}
