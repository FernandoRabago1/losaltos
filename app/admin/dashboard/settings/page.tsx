import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
        <p className="mt-2 text-zinc-600">
          Manage your account and preferences
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-zinc-900/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
          <SettingsIcon className="h-8 w-8 text-zinc-600" />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-zinc-900">
          Settings Coming Soon
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          User preferences, profile settings, and configuration options will be
          available here.
        </p>
      </div>
    </div>
  );
}
