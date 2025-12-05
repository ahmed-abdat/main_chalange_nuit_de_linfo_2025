'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  Users,
  Download,
  GraduationCap,
  BookOpen,
  MapPin,
  ArrowRight,
  Quote,
  ExternalLink,
} from 'lucide-react'
import BlurText from '@/components/BlurText'
import Particles from '@/components/Particles'
import { MagicCard } from '@/components/ui/magic-card'
import { cn } from '@/lib/utils'
import {
  contributeActions,
  schoolMarkers,
  communityImpact,
  communityTestimonials,
  type ContributeAction,
  type SchoolMarker,
} from '@/data/community'

// Icon mapping
const ICONS = {
  download: Download,
  users: Users,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
}

// School Card Component for the network visualization
function SchoolCard({
  school,
  index,
  isInView,
}: {
  school: SchoolMarker
  index: number
  isInView: boolean
}) {
  const typeColors = {
    lycee: '#00997d',
    college: '#3B82F6',
    ecole: '#F9A825',
  }
  const typeLabels = {
    lycee: 'Lycée',
    college: 'Collège',
    ecole: 'École',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="relative p-4 bg-[#242428]/80 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#00997d]/50 transition-all"
    >
      {/* Type badge */}
      <div
        className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
        style={{ backgroundColor: typeColors[school.type], color: '#1a1a1d' }}
      >
        {typeLabels[school.type]}
      </div>

      {/* School info */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${typeColors[school.type]}20` }}
        >
          <GraduationCap
            className="w-5 h-5"
            style={{ color: typeColors[school.type] }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{school.name}</h4>
          <p className="text-xs text-gray-400">{school.region}</p>
          <div className="flex items-center gap-1 mt-1">
            <span
              className="text-lg font-bold"
              style={{ color: typeColors[school.type] }}
            >
              {school.pcs}
            </span>
            <span className="text-[10px] text-gray-500">PCs</span>
          </div>
        </div>
      </div>

      {/* Decorative pulse */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100"
        style={{ border: `1px solid ${typeColors[school.type]}` }}
        animate={{
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}

// Network Visualization - Schools Grid
function SchoolsNetwork({ isInView }: { isInView: boolean }) {
  return (
    <div className="space-y-4">
      {/* Header with total */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00997d]/10 rounded-full border border-[#00997d]/20">
          <div className="w-2 h-2 rounded-full bg-[#00997d] animate-pulse" />
          <span className="text-sm text-[#00d9a7] font-medium">
            {schoolMarkers.reduce((sum, s) => sum + s.pcs, 0)} PCs au total
          </span>
        </div>
      </div>

      {/* Schools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {schoolMarkers.map((school, index) => (
          <SchoolCard
            key={school.id}
            school={school}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Regions summary */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full">
          <MapPin className="w-3 h-3 text-[#00997d]" />
          <span className="text-xs text-gray-400">Hauts-de-France</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full">
          <MapPin className="w-3 h-3 text-[#00997d]" />
          <span className="text-xs text-gray-400">Auvergne-Rhône-Alpes</span>
        </div>
      </div>
    </div>
  )
}

// Contribute Card Component
function ContributeCard({
  action,
  index,
  isInView,
}: {
  action: ContributeAction
  index: number
  isInView: boolean
}) {
  const Icon = ICONS[action.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      <MagicCard
        gradientColor={`${action.color}30`}
        gradientOpacity={0.5}
        className="h-full"
      >
        <a
          href={action.href}
          target={action.href.startsWith('http') ? '_blank' : undefined}
          rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={cn(
            'block p-5 rounded-xl transition-all duration-300',
            'bg-[#242428]/80 backdrop-blur-sm border border-white/10',
            'hover:border-white/20 group'
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${action.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: action.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white group-hover:text-[#00d9a7] transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {action.description}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#00997d] group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </a>
      </MagicCard>
    </motion.div>
  )
}

// Testimonial Card Component
function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: (typeof communityTestimonials)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
      className="p-6 bg-[#242428]/80 rounded-2xl border border-white/10 backdrop-blur-sm"
    >
      <Quote className="w-8 h-8 text-[#F9A825]/30 mb-4" />
      <p className="text-gray-300 italic mb-4 leading-relaxed text-sm">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#00997d20' }}
        >
          <span className="text-[#00997d] font-bold">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{testimonial.author}</p>
          <p className="text-gray-500 text-xs">
            {testimonial.role}
            {testimonial.school && ` - ${testimonial.school}`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Community Section Component
export default function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const impactStats = [
    { value: communityImpact.pcsReconditioned, suffix: '+', label: 'PCs reconditionnés' },
    { value: communityImpact.schoolsEquipped, label: 'Écoles équipées' },
    { value: communityImpact.academiesParticipating, label: 'Académies participantes' },
  ]

  return (
    <section
      data-section="community"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={25}
          particleSpread={25}
          speed={0.015}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-[#00997d]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#F9A825]/15 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00997d]/20 text-[#00d9a7] text-sm font-medium rounded-full mb-6"
          >
            <Users className="w-4 h-4" />
            Rejoindre le Mouvement
          </motion.span>

          <BlurText
            text="La Communauté NIRD"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
            delay={80}
            animateBy="words"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
          >
            Des établissements partout en France ont déjà fait le choix de la
            liberté numérique
          </motion.p>
        </div>

        {/* Impact Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="text-center px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#00997d]">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout: Schools + Actions */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Schools Network */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center lg:justify-start gap-2">
              <GraduationCap className="w-5 h-5 text-[#00997d]" />
              Écoles du Réseau NIRD
            </h3>
            <SchoolsNetwork isInView={isInView} />
          </motion.div>

          {/* Contribute Actions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 text-center lg:text-left">
              Comment Participer ?
            </h3>
            {contributeActions.map((action, index) => (
              <ContributeCard
                key={action.id}
                action={action}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Témoignages
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {communityTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Learn More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00997d] transition-colors"
          >
            <span>En savoir plus sur le projet NIRD au lycée Carnot</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
