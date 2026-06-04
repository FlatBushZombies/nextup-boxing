"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 64,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance, filter: "blur(18px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.0, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
