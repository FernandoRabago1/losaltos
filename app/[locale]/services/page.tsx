'use client';

import {
  Lightbulb,
  FileSearch,
  PenTool,
  ClipboardCheck,
  HardHat,
  Wrench,
  CheckCircle,
  ArrowRight,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

export default function ServicesPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const t = translations[locale];

  const roadmapSteps = [
    {
      phase: t.services.phase1,
      title: t.services.phase1Title,
      icon: Lightbulb,
      description: t.services.phase1Description,
      points: [
        t.services.phase1Point1,
        t.services.phase1Point2,
        t.services.phase1Point3,
        t.services.phase1Point4,
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      phase: t.services.phase2,
      title: t.services.phase2Title,
      icon: PenTool,
      description: t.services.phase2Description,
      points: [
        t.services.phase2Point1,
        t.services.phase2Point2,
        t.services.phase2Point3,
        t.services.phase2Point4,
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      phase: t.services.phase3,
      title: t.services.phase3Title,
      icon: FileSearch,
      description: t.services.phase3Description,
      points: [
        t.services.phase3Point1,
        t.services.phase3Point2,
        t.services.phase3Point3,
        t.services.phase3Point4,
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
    {
      phase: t.services.phase4,
      title: t.services.phase4Title,
      icon: ClipboardCheck,
      description: t.services.phase4Description,
      points: [
        t.services.phase4Point1,
        t.services.phase4Point2,
        t.services.phase4Point3,
        t.services.phase4Point4,
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      phase: t.services.phase5,
      title: t.services.phase5Title,
      icon: HardHat,
      description: t.services.phase5Description,
      points: [
        t.services.phase5Point1,
        t.services.phase5Point2,
        t.services.phase5Point3,
        t.services.phase5Point4,
      ],
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
    },
    {
      phase: t.services.phase6,
      title: t.services.phase6Title,
      icon: Wrench,
      description: t.services.phase6Description,
      points: [
        t.services.phase6Point1,
        t.services.phase6Point2,
        t.services.phase6Point3,
        t.services.phase6Point4,
      ],
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-indigo-50',
    },
    {
      phase: t.services.phase7,
      title: t.services.phase7Title,
      icon: Home,
      description: t.services.phase7Description,
      points: [
        t.services.phase7Point1,
        t.services.phase7Point2,
        t.services.phase7Point3,
        t.services.phase7Point4,
      ],
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
    },
  ];

  const servicesBand = [
    t.services.consulting,
    t.services.planning,
    t.services.design,
    t.services.architecture,
    t.services.construction,
    t.services.supervision,
  ];

  const whyChooseItems = [
    {
      title: t.services.expertTeamTitle,
      description: t.services.expertTeamDesc,
    },
    {
      title: t.services.timelyDeliveryTitle,
      description: t.services.timelyDeliveryDesc,
    },
    {
      title: t.services.qualityGuaranteeTitle,
      description: t.services.qualityGuaranteeDesc,
    },
    {
      title: t.services.transparentPricingTitle,
      description: t.services.transparentPricingDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Homepage Style */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 mb-8 leading-tight">
                {t.services.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 font-light mb-8 leading-relaxed">
                {t.services.heroDescription}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 text-zinc-900 font-normal hover:gap-3 transition-all duration-300"
              >
                {t.services.startProject}
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <img
                src="/buildingServices.jpg"
                alt="Building Services"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Categories Band - Bold Japanese Style */}
      <section className="py-20 bg-white border-y border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
          >
            {servicesBand.map((service, index) => (
              <span
                key={index}
                className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 tracking-tight lowercase"
              >
                {service}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image on the left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <img
                src="/uploads/1763593913962-escena-3(1)_upscale01.png"
                alt="Our team at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Text on the right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-zinc-900 mb-8">
                {t.services.whyChooseTitle}
              </h2>
              <p className="text-lg text-zinc-600 mb-8 font-light">
                {t.services.whyChooseDescription}
              </p>

              <div className="space-y-6">
                {whyChooseItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 border border-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-zinc-900" size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">{item.title}</h3>
                      <p className="text-zinc-600 font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 mb-6">
              {t.services.processTitle}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light">
              {t.services.processDescription}
            </p>
          </motion.div>

          {/* Timeline Roadmap - Architectural Concrete Style */}
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="border border-zinc-300 bg-white p-8 hover:border-zinc-400 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-start gap-6">
                    {/* Minimalist Icon */}
                    <div className="w-14 h-14 border-2 border-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 bg-white">
                      <Icon className="text-zinc-900" size={24} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-zinc-900 tracking-wider">
                          {step.phase.toUpperCase()}
                        </span>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>

                      <h3 className="text-3xl font-semibold text-zinc-900 mb-3">
                        {step.title}
                      </h3>

                      <p className="text-zinc-700 font-normal mb-4 leading-relaxed text-base">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3 text-base text-zinc-700">
                            <span className="text-zinc-500 mt-1 font-bold">—</span>
                            <span className="font-normal">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final Success */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="mt-16 text-center border border-zinc-300 bg-white p-12 shadow-lg"
          >
            <div className="w-20 h-20 border-2 border-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 bg-white">
              <CheckCircle className="text-zinc-900" size={32} strokeWidth={2} />
            </div>
            <h3 className="text-4xl font-semibold text-zinc-900 mb-4">{t.services.completedTitle}</h3>
            <p className="text-lg text-zinc-700 font-normal max-w-2xl mx-auto leading-relaxed">
              {t.services.completedDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1400px] mx-auto px-6 md:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            {t.services.ctaTitle}
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            {t.services.ctaDescription}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 text-white font-normal hover:gap-3 transition-all duration-300 text-lg"
          >
            {t.services.contactNow}
            <ArrowRight size={20} />
          </Link>
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
