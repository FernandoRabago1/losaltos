'use client';

import {
  Lightbulb,
  FileSearch,
  PenTool,
  ClipboardCheck,
  HardHat,
  Wrench,
  ClipboardList,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const roadmapSteps = [
  {
    phase: 'Fase 1',
    title: 'Consulta Inicial & Conceptualización',
    icon: Lightbulb,
    description: 'Comenzamos entendiendo tu visión, necesidades y aspiraciones para el proyecto.',
    points: [
      'Reunión inicial para conocer tus objetivos',
      'Análisis del sitio y evaluación de viabilidad',
      'Definición de presupuesto y cronograma',
      'Desarrollo de concepto inicial'
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    phase: 'Fase 2',
    title: 'Diseño Arquitectónico',
    icon: PenTool,
    description: 'Creamos diseños detallados que combinan estética, funcionalidad y sostenibilidad.',
    points: [
      'Diseño conceptual y bocetos iniciales',
      'Planos arquitectónicos detallados',
      'Modelado 3D y renderizados fotorrealistas',
      'Selección de materiales y acabados'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    phase: 'Fase 3',
    title: 'Ingeniería & Documentación',
    icon: FileSearch,
    description: 'Desarrollamos toda la documentación técnica necesaria para la construcción.',
    points: [
      'Ingeniería estructural y de instalaciones',
      'Especificaciones técnicas detalladas',
      'Cálculos y memorias de cálculo',
      'Detalles constructivos'
    ],
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    phase: 'Fase 4',
    title: 'Permisos & Aprobaciones',
    icon: ClipboardCheck,
    description: 'Gestionamos todos los trámites legales y permisos necesarios ante las autoridades.',
    points: [
      'Presentación ante autoridades locales',
      'Gestión de permisos de construcción',
      'Cumplimiento normativo y regulatorio',
      'Coordinación con instituciones'
    ],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
  },
  {
    phase: 'Fase 5',
    title: 'Construcción & Supervisión',
    icon: HardHat,
    description: 'Ejecutamos la obra con los más altos estándares de calidad y control.',
    points: [
      'Coordinación de contratistas especializados',
      'Supervisión diaria de obra',
      'Control de calidad en cada etapa',
      'Reportes semanales de avance'
    ],
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
  },
  {
    phase: 'Fase 6',
    title: 'Acabados & Detalles',
    icon: Wrench,
    description: 'Nos enfocamos en los detalles finales que hacen la diferencia.',
    points: [
      'Instalación de acabados premium',
      'Coordinación de mobiliario fijo',
      'Pruebas de instalaciones',
      'Ajustes y perfeccionamientos'
    ],
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
  },
  {
    phase: 'Fase 7',
    title: 'Entrega & Postventa',
    icon: Home,
    description: 'Entregamos tu proyecto listo para disfrutar, con soporte continuo.',
    points: [
      'Inspección final y walk-through',
      'Documentación as-built completa',
      'Capacitación en sistemas',
      'Garantía y mantenimiento'
    ],
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
  },
];

const keyBenefits = [
  {
    icon: Sparkles,
    title: 'Diseño Innovador',
    description: 'Soluciones creativas que destacan por su originalidad y funcionalidad'
  },
  {
    icon: ClipboardList,
    title: 'Gestión Integral',
    description: 'Coordinamos todos los aspectos del proyecto de principio a fin'
  },
  {
    icon: CheckCircle,
    title: 'Calidad Garantizada',
    description: 'Estándares rigurosos de construcción y materiales de primera'
  },
];

export default function ServicesPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Homepage Style */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 mb-8 leading-tight">
                De la Visión a la Realidad
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 font-light mb-8 leading-relaxed">
                LOS ALTOS ofrece un proceso integral que transforma tus ideas en proyectos extraordinarios. Desde el diseño arquitectónico hasta la construcción y supervisión, garantizamos excelencia en cada etapa.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-zinc-900 font-normal hover:gap-3 transition-all duration-300"
              >
                INICIAR PROYECTO
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <img
                src="/buildingServices.jpg"
                alt="Building Services"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image on the left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <img
                src="/image3.png"
                alt="Our team at work"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Text on the right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-zinc-900 mb-8">
                ¿Por Qué Elegir LOS ALTOS?
              </h2>
              <p className="text-lg text-zinc-600 mb-8 font-light">
                Con años de experiencia y un compromiso con la excelencia, entregamos proyectos que superan las expectativas.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Equipo Experto',
                    description: 'Arquitectos, ingenieros y artesanos capacitados dedicados a la calidad.',
                  },
                  {
                    title: 'Entrega a Tiempo',
                    description: 'Respetamos tu tiempo y entregamos proyectos dentro de los plazos acordados.',
                  },
                  {
                    title: 'Garantía de Calidad',
                    description: 'Control de calidad riguroso en cada etapa del proyecto.',
                  },
                  {
                    title: 'Precios Transparentes',
                    description: 'Cotizaciones claras y detalladas sin costos ocultos ni sorpresas.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 border border-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-zinc-900" size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">{item.title}</h3>
                      <p className="text-zinc-600 font-light">{item.description}</p>
                    </div>
                  </motion.div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 mb-6">
              Nuestro Proceso
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light">
              Cada proyecto sigue un roadmap estructurado que garantiza excelencia en cada etapa
            </p>
          </motion.div>

          {/* Timeline Roadmap - Minimalist Japanese Style */}
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-zinc-200 bg-white p-8 hover:border-zinc-900 transition-colors duration-300"
                >
                  <div className="flex items-start gap-6">
                    {/* Minimalist Icon */}
                    <div className="w-12 h-12 border border-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-zinc-900" size={20} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-light text-zinc-500 tracking-wider">
                          {step.phase.toUpperCase()}
                        </span>
                        <div className="h-px flex-1 bg-zinc-200" />
                      </div>

                      <h3 className="text-2xl font-light text-zinc-900 mb-2">
                        {step.title}
                      </h3>

                      <p className="text-zinc-600 font-light mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3 text-sm text-zinc-600">
                            <span className="text-zinc-400 mt-1">—</span>
                            <span className="font-light">{point}</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center border border-zinc-200 bg-white p-12"
          >
            <div className="w-16 h-16 border border-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-zinc-900" size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-light text-zinc-900 mb-3">Proyecto Completado</h3>
            <p className="text-lg text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed">
              Tu espacio soñado, listo para disfrutar. Cada detalle perfeccionado, cada promesa cumplida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto px-6 md:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            ¿Listo para Comenzar tu Proyecto?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            Conversemos sobre cómo podemos hacer realidad tu visión
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white font-normal hover:gap-3 transition-all duration-300 text-lg"
          >
            CONTACTAR AHORA
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-zinc-500 text-sm text-center md:text-left font-light">
              © 2024 Los ALTOS. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                Términos de Servicio
              </Link>
              <Link
                href="/contact"
                className="text-zinc-500 hover:text-white transition-colors font-light"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
