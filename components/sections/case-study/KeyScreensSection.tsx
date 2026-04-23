'use client'

import { useState } from 'react'
import { Container } from '../../layout/Container'
import { ImageModal } from '../../ui/ImageModal'

interface Screen {
  src: string
  caption: string
}

interface KeyScreensSectionProps {
  screens: Screen[]
  sectionLabel?: string
  screensUnit?: string
}

/**
 * Key Screens section.
 * Uses the same py-40 vertical padding as PhilosophySection.
 * Header row mirrors ProjectsGrid section header (tracking-widest, text-[10px]).
 * Cards use same ring/shadow/rounded pattern as ProjectCard.
 */
export function KeyScreensSection({ screens, sectionLabel = 'Key Screens', screensUnit = 'SCREENS' }: KeyScreensSectionProps) {
  const [selectedImage, setSelectedImage] = useState<Screen | null>(null)

  const selectedIndex = selectedImage ? screens.findIndex(s => s.src === selectedImage.src) : -1
  const hasNext = selectedIndex !== -1 && selectedIndex < screens.length - 1
  const hasPrev = selectedIndex > 0

  const handleNext = () => {
    if (hasNext) setSelectedImage(screens[selectedIndex + 1])
  }

  const handlePrev = () => {
    if (hasPrev) setSelectedImage(screens[selectedIndex - 1])
  }

  return (
    <section className="w-full py-40 bg-background border-t border-border-subtle/50">
      <Container>
        {/* Section header — same style as ProjectsGrid */}
        <div className="flex justify-between items-center mb-16 uppercase tracking-[0.2em] text-[10px] font-bold text-brand-muted">
          <h2>{sectionLabel}</h2>
          <span className="opacity-50">{screens.length.toString().padStart(2, '0')} {screensUnit}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {screens.map((screen, i) => (
            <div
              key={i}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-border-subtle/50 transition-all duration-300 hover:shadow-md"
            >
              {/* Image Container — Clickable */}
              <button
                onClick={() => setSelectedImage(screen)}
                className="w-full aspect-[16/10] relative bg-border-subtle/30 overflow-hidden cursor-zoom-in block"
                aria-label={`View ${screen.caption} full screen`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.src}
                  alt={screen.caption}
                  className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              {/* Caption */}
              <div className="px-10 py-8 flex items-start gap-5 border-t border-border-subtle/30">
                <span className="text-[9px] font-black text-brand-muted tracking-[0.2em] uppercase shrink-0 pt-[3px] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[13px] leading-[1.8] text-brand-gray font-medium">
                  {screen.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* High-Fidelity Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.caption || ''}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </section>
  )
}
