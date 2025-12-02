'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Users, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

const teamMembers = [
  {
    name: 'Michael Chen',
    role: 'Fundador y Arquitecto Principal',
    bio: 'Más de 15 años de experiencia en diseño arquitectónico y gestión de construcción.',
  },
  {
    name: 'Sarah Martinez',
    role: 'Directora Creativa',
    bio: 'Se especializa en diseño sustentable y soluciones arquitectónicas innovadoras.',
  },
  {
    name: 'David Johnson',
    role: 'Gerente de Construcción',
    bio: 'Experto en gestión de proyectos y control de calidad con 20 años de experiencia.',
  },
  {
    name: 'Emily Wong',
    role: 'Líder de Diseño de Interiores',
    bio: 'Crea espacios hermosos y funcionales que reflejan la personalidad de los clientes.',
  },
];

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const t = translations[locale];

  const values = [
    {
      icon: Target,
      title: t.about.excellenceTitle,
      description: t.about.excellenceDesc,
    },
    {
      icon: Users,
      title: t.about.collaborationTitle,
      description: t.about.collaborationDesc,
    },
    {
      icon: Award,
      title: t.about.innovationTitle,
      description: t.about.innovationDesc,
    },
    {
      icon: Heart,
      title: t.about.integrityTitle,
      description: t.about.integrityDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Japanese Minimalist Style */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 mb-8 leading-tight">
              {t.about.heroTitle}
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light">
              {t.about.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-zinc-900 mb-8">{t.about.storyTitle}</h2>
              <div className="space-y-6 text-lg text-zinc-600 font-light leading-relaxed">
                <p>
                  {t.about.storyParagraph1}
                </p>
                <p>
                  {t.about.storyParagraph2}
                </p>
                <p>
                  {t.about.storyParagraph3}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <Image
                src="/uploads/1763578144257-escena-5(1)_upscale01.png"
                alt="Los ALTOS team"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Japanese Minimalist Style */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="border border-zinc-200 p-12"
            >
              <h3 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6">{t.about.missionTitle}</h3>
              <p className="text-zinc-600 font-light leading-relaxed text-lg">
                {t.about.missionText}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="border border-zinc-200 p-12"
            >
              <h3 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6">{t.about.visionTitle}</h3>
              <p className="text-zinc-600 font-light leading-relaxed text-lg">
                {t.about.visionText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Japanese Minimalist Style */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 mb-6">{t.about.valuesTitle}</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto font-light">
              {t.about.valuesDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="text-center border border-zinc-200 bg-white p-8 hover:border-zinc-900 transition-colors duration-300"
                >
                  <div className="w-16 h-16 border border-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-zinc-900" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light text-zinc-900 mb-3">{value.title}</h3>
                  <p className="text-zinc-600 font-light leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Japanese Minimalist Style */}
      {/* <section id="team" className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 mb-6">{t.about.teamTitle}</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto font-light">
              {t.about.teamDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="border border-zinc-200 bg-white hover:border-zinc-900 transition-colors duration-300"
              >
                <div className="aspect-square relative bg-zinc-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-zinc-900 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-light text-zinc-900">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light text-zinc-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4 font-light">{member.role}</p>
                  <p className="text-zinc-600 text-sm font-light leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Facilities Image Section */}
      <section className="py-0 bg-zinc-50">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
          >
            <Image
              src="/bodega.png"
              alt="LOS ALTOS Facilities"
              fill
              className="object-cover grayscale"
              loading="lazy"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Japanese Minimalist Style */}
      <section className="py-24 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1600px] mx-auto px-6 md:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            {t.about.ctaTitle}
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            {t.about.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 text-white font-normal hover:gap-3 transition-all duration-300 text-lg"
            >
              {t.about.startProject}
              <ArrowRight size={20} />
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center gap-2 text-zinc-400 font-light hover:text-white transition-colors duration-300 text-lg"
            >
              {t.about.viewPortfolio}
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-zinc-500 text-sm text-center md:text-left font-light">
              {t.footer.copyright}
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link
                href={`/${locale}/privacy`}
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                {t.footer.terms}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                {t.footer.contact}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
