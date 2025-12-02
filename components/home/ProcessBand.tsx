'use client';

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';

interface ProcessBandProps {
  locale: Locale;
}

export default function ProcessBand({ locale }: ProcessBandProps) {
  const processSteps = {
    es: ['Desde la', 'conceptualización', 'hasta la', 'construcción final'],
    en: ['From', 'conceptualization', 'to', 'final construction'],
    pt: ['Desde a', 'conceitualização', 'até a', 'construção final'],
    zh: ['从', '概念化', '到', '最终施工'],
    ja: ['コンセプトから', '最終施工まで', '', ''],
  };

  const steps = processSteps[locale] || processSteps.es;

  return (
    <section className="py-20 bg-white border-y border-zinc-200">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {steps.map((step, index) => (
            step && (
              <span
                key={index}
                className={`text-lg md:text-xl lg:text-2xl text-zinc-900 tracking-tight ${
                  step === 'conceptualización' ||
                  step === 'construcción final' ||
                  step === 'conceptualization' ||
                  step === 'final construction' ||
                  step === 'conceitualização' ||
                  step === 'construção final' ||
                  step === '概念化' ||
                  step === '最终施工' ||
                  step === 'コンセプトから' ||
                  step === '最終施工まで'
                    ? 'font-bold'
                    : 'font-light'
                }`}
              >
                {step}
              </span>
            )
          ))}
        </motion.div>
      </div>
    </section>
  );
}
