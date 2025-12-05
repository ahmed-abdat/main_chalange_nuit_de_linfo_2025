'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { FlaskConical, ArrowRight, Gamepad2, X, Check } from 'lucide-react';
import Image from 'next/image';
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import { CometCard } from '@/components/ui/CometCard';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

// Software alternatives data with actual logos
const ALTERNATIVES = [
  {
    id: 1,
    from: { name: 'Windows', logo: '/images/Windows_11_logo.svg', color: '#0078D4' },
    to: { name: 'Linux', logo: '/images/linux.svg', color: '#00997d' },
    benefit: 'Gratuit & Léger',
  },
  {
    id: 2,
    from: { name: 'MS Office', logo: '/images/office.svg', color: '#D83B01' },
    to: { name: 'LibreOffice', logo: '/images/LibreOffice_logo.svg', color: '#18A303' },
    benefit: 'Open Source',
  },
  {
    id: 3,
    from: { name: 'Photoshop', logo: '/images/photoshop.svg', color: '#31A8FF' },
    to: { name: 'GIMP', logo: '/images/The_GIMP_icon_-_gnome.svg', color: '#5C5543' },
    benefit: '100% Gratuit',
  },
  {
    id: 4,
    from: { name: 'Chrome', logo: '/images/chrome.svg', color: '#4285F4' },
    to: { name: 'Firefox', logo: '/images/firefox.svg', color: '#FF7139' },
    benefit: 'Vie Privée',
  },
];

function TransformationCard({
  item,
  index,
  isInView,
}: {
  item: typeof ALTERNATIVES[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);

  const currentLogo = isTransformed ? item.to.logo : item.from.logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.6, type: 'spring' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsTransformed(!isTransformed)}
      className="cursor-pointer"
    >
      <CometCard rotateDepth={8} translateDepth={10} className="h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-[#242428]/90 backdrop-blur-sm border border-white/10">
          {/* Animated border on hover */}
          <AnimatePresence>
            {isHovered && (
              <BorderBeam
                size={80}
                duration={3}
                colorFrom={isTransformed ? '#00997d' : '#C62828'}
                colorTo={isTransformed ? '#F9A825' : '#ff6b6b'}
                borderWidth={2}
              />
            )}
          </AnimatePresence>

          <div className="p-5 sm:p-6">
            {/* Header with logo and state badge */}
            <div className="flex items-center justify-between mb-4">
              <motion.div
                animate={{ rotate: isTransformed ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center p-2',
                  isTransformed ? 'bg-[#00997d]/20' : 'bg-white/10'
                )}
              >
                {currentLogo ? (
                  <Image
                    src={currentLogo}
                    alt={isTransformed ? item.to.name : item.from.name}
                    width={32}
                    height={32}
                    className="object-contain"
                    style={{ width: 'auto', height: 'auto', maxWidth: 32, maxHeight: 32 }}
                  />
                ) : (
                  <span
                    className="text-lg font-bold"
                    style={{ color: isTransformed ? item.to.color : item.from.color }}
                  >
                    {(isTransformed ? item.to.name : item.from.name).charAt(0)}
                  </span>
                )}
              </motion.div>

              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isTransformed ? 'rgba(0, 153, 125, 0.2)' : 'rgba(198, 40, 40, 0.2)',
                  borderColor: isTransformed ? 'rgba(0, 153, 125, 0.4)' : 'rgba(198, 40, 40, 0.4)',
                }}
                className="px-2 py-1 rounded-full border text-xs font-medium flex items-center gap-1"
              >
                {isTransformed ? (
                  <>
                    <Check className="w-3 h-3 text-[#00997d]" />
                    <span className="text-[#00d9a7]">Libre</span>
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3 text-[#C62828]" />
                    <span className="text-[#ff6b6b]">Proprio</span>
                  </>
                )}
              </motion.div>
            </div>

            {/* Name transformation */}
            <div className="relative h-[4.5rem] mb-3 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isTransformed ? 'to' : 'from'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <h3
                    className={cn(
                      'text-xl font-bold leading-tight',
                      isTransformed ? 'line-through opacity-40' : ''
                    )}
                    style={{ color: isTransformed ? item.from.color : item.from.color }}
                  >
                    {isTransformed ? item.from.name : item.from.name}
                  </h3>
                  {isTransformed && (
                    <motion.h3
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-xl font-bold leading-tight mt-1"
                      style={{ color: item.to.color }}
                    >
                      {item.to.name}
                    </motion.h3>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Transformation arrow */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-500',
                  isTransformed
                    ? 'bg-gradient-to-r from-[#C62828]/30 to-[#00997d]'
                    : 'bg-gradient-to-r from-[#C62828] to-[#C62828]/30'
                )}
              />
              <motion.div
                animate={{ x: isTransformed ? 5 : 0, scale: isTransformed ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight
                  className={cn(
                    'w-5 h-5 transition-colors duration-300',
                    isTransformed ? 'text-[#00997d]' : 'text-[#C62828]'
                  )}
                />
              </motion.div>
              <div
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-500',
                  isTransformed
                    ? 'bg-gradient-to-r from-[#00997d] to-[#F9A825]'
                    : 'bg-gradient-to-r from-[#C62828]/30 to-[#C62828]/10'
                )}
              />
            </div>

            {/* Benefit badge */}
            <motion.div
              initial={false}
              animate={{
                opacity: isTransformed ? 1 : 0.5,
                scale: isTransformed ? 1 : 0.95,
              }}
              className={cn(
                'text-center py-2 px-3 rounded-lg border transition-colors duration-300',
                isTransformed
                  ? 'bg-[#00997d]/10 border-[#00997d]/30 text-[#00d9a7]'
                  : 'bg-white/5 border-white/10 text-gray-400'
              )}
            >
              <span className="text-sm font-medium">{item.benefit}</span>
            </motion.div>

            {/* Click hint */}
            <motion.p
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="text-xs text-center text-gray-400 mt-3"
            >
              Cliquez pour transformer
            </motion.p>
          </div>
        </div>
      </CometCard>
    </motion.div>
  );
}

export default function KnowledgePotionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-section="knowledge-potion"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          particleCount={30}
          particleSpread={30}
          speed={0.02}
          particleColors={['#00997d', '#F9A825', '#C62828']}
          alphaParticles={true}
          particleBaseSize={30}
          moveParticlesOnHover={true}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#C62828]/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00997d]/15 rounded-full blur-[120px] translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F9A825]/8 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] text-sm font-medium rounded-full mb-4"
          >
            <FlaskConical className="w-4 h-4" />
            La Potion du Savoir
          </motion.span>

          {/* Title */}
          <BlurText
            text="La Magie de la Transformation"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            delay={80}
            animateBy="words"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-2"
          >
            Cliquez sur chaque carte pour découvrir la puissance des logiciels libres
          </motion.p>

          {/* Interactive hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-[#F9A825]"
          >
            <span className="text-sm font-medium">[ Cliquez sur les cartes ]</span>
          </motion.div>
        </div>

        {/* Transformation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {ALTERNATIVES.map((alt, index) => (
            <TransformationCard
              key={alt.id}
              item={alt}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA to Memory Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#00997d]/10 rounded-xl border border-[#00997d]/20">
            <Gamepad2 className="w-5 h-5 text-[#F9A825]" />
            <p className="text-white/80 text-sm">
              <span className="text-[#00d9a7] font-medium">Prochain défi :</span>{' '}
              Sauve un PC de l'obsolescence !
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
