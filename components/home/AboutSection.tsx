'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { translations } from '@/lib/i18n/translations';

interface AboutSectionProps {
  locale: Locale;
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const t = translations[locale];
  return (
    <section className="bg-white pt-3 md:pt-16 pb-8 md:pb-12 px-6 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 mb-8 leading-tight">
              {t.home.aboutTitle}
            </h2>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed font-light">
              {locale === 'es' ? (
                <>
                  Somos una constructora especializada en <strong className="font-semibold">diseño estructural</strong> y <strong className="font-semibold">arquitectónico</strong>. Transformamos ideas en realidades construidas, combinando ingeniería de precisión con creatividad arquitectónica para desarrollar proyectos integrales desde la conceptualización hasta la <strong className="font-semibold">construcción final</strong>.
                </>
              ) : locale === 'en' ? (
                <>
                  We are a construction company specializing in <strong className="font-semibold">structural</strong> and <strong className="font-semibold">architectural</strong> design. We transform ideas into built realities, combining engineering precision with architectural creativity to develop comprehensive projects from conceptualization to <strong className="font-semibold">final construction</strong>.
                </>
              ) : locale === 'pt' ? (
                <>
                  Somos uma construtora especializada em <strong className="font-semibold">design estrutural</strong> e <strong className="font-semibold">arquitetônico</strong>. Transformamos ideias em realidades construídas, combinando precisão de engenharia com criatividade arquitetônica para desenvolver projetos integrais desde a conceitualização até a <strong className="font-semibold">construção final</strong>.
                </>
              ) : locale === 'zh' ? (
                <>
                  我们是一家专注于<strong className="font-semibold">结构</strong>和<strong className="font-semibold">建筑</strong>设计的建筑公司。我们将创意转化为建筑现实，结合工程精度与建筑创造力，从概念到<strong className="font-semibold">最终施工</strong>开发综合项目。
                </>
              ) : (
                <>
                  私たちは<strong className="font-semibold">構造設計</strong>と<strong className="font-semibold">建築設計</strong>を専門とする建設会社です。エンジニアリングの精度と建築の創造性を組み合わせ、アイデアを建築された現実に変え、コンセプトから<strong className="font-semibold">最終施工</strong>まで包括的なプロジェクトを開発します。
                </>
              )}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-3 text-sm uppercase tracking-wider text-zinc-900 font-medium group"
            >
              <span>{t.home.learnMore}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
              <video
                src="/BodegaConstrucion.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}