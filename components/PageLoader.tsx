"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const LOADER_DURATION_MS = 1700

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : ""
    const timer = setTimeout(() => setIsVisible(false), LOADER_DURATION_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo.png"
                alt="Next Up Boxing League"
                width={120}
                height={60}
                priority
                className="h-auto w-[120px]"
              />
            </motion.div>

            <div className="mt-8 h-[2px] w-40 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-[#c5203a]"
              />
            </div>

            <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#111111] font-sans">
              Showcasing Elite Amateurs
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
