'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { translations } from '@/lib/i18n/translations';

interface TeamSectionProps {
  locale: Locale;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  const t = translations[locale];

  return (
    <section className="bg-white pb-24 px-6 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-4xl md:text-5xl font-light text-zinc-900 mb-6">
            {t.home.teamTitle}
          </h3>
          <p className="text-lg text-zinc-600 mb-8 max-w-4xl font-light">
            {t.home.teamDescription}
          </p>
          <Link
            href={`/${locale}/about#team`}
            className="inline-flex items-center gap-3 text-sm uppercase tracking-wider text-zinc-900 font-medium group"
          >
            <span>{t.home.meetTeam}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="aspect-[21/9] relative rounded-2xl overflow-hidden">
            <Image
              src="/uploads/1763593929097-escena-2.png"
              alt="Los Altos Office"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
