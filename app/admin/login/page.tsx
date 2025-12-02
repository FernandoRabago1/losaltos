'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions/auth';
import { AlertCircle, Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-disabled={pending}
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Sign In
        </>
      )}
    </motion.button>
  );
}

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-zinc-900/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900"
            >
              <LogIn className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-zinc-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Sign in to manage your projects
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>{errorMessage}</p>
              </motion.div>
            )}

            <LoginButton />
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/admin/register"
                className="font-semibold text-zinc-900 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-lg bg-zinc-900/5 p-4 backdrop-blur-sm"
        >
          <p className="text-center text-xs text-zinc-600">
            Secure admin access for project management
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
