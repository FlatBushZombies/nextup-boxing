"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const LOADER_DURATION_MS = 1700

// Cubic that matches the "power4.inOut" feel — sharp deceleration
const cinematic: [number, number, number, number] = [0.76, 0, 0.24, 1]

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => setIsVisible(false), LOADER_DURATION_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: cinematic }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#111111]"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/logo.png"
              alt="Next Up Boxing League"
              width={120}
              height={60}
              priority
              className="h-auto w-[100px]"
            />

            {/* Gold fill bar */}
            <div className="mt-7 h-[1.5px] w-36 overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#b8962e] via-[#d4b65a] to-[#b8962e]"
              />
            </div>

            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-5 text-[9px] font-semibold uppercase tracking-[0.38em] text-white/40 font-sans"
            >
              Showcasing Elite Amateurs
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
