'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt, onNext, onPrev, hasNext, hasPrev }: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev()
    },
    [onClose, onNext, onPrev, hasNext, hasPrev]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
            onClick={onClose}
          />

          {/* Navigation Buttons */}
          {hasPrev && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </motion.button>
          )}

          {hasNext && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </motion.button>
          )}

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={1.5} className="md:w-8 md:h-8" />
          </motion.button>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-h-[90vh] flex flex-col items-center justify-center p-2 z-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-[95%] max-h-[85vh] w-auto h-auto object-contain select-none shadow-2xl rounded-lg ring-1 ring-white/10"
              style={{ 
                imageRendering: 'auto',
                // This ensures we never upscale beyond natural resolution, which causes blurriness
                maxWidth: 'min(95vw, 100%)', 
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth < window.innerWidth * 0.9) {
                  img.style.width = `${img.naturalWidth}px`;
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
