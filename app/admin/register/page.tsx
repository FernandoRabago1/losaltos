'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after 3 seconds
    const timer = setTimeout(() => {
      router.push('/admin/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-white p-12 shadow-2xl ring-1 ring-zinc-900/5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
          >
            <Lock className="h-10 w-10 text-red-600" />
          </motion.div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-4">
            Registro Deshabilitado
          </h1>

          <p className="text-zinc-600 mb-6">
            El registro público ha sido deshabilitado por seguridad. Solo los administradores autorizados pueden acceder al panel.
          </p>

          <p className="text-sm text-zinc-500">
            Serás redirigido al login en unos segundos...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
