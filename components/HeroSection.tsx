"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [20, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.04, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 30])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation with stagger
      gsap.fromTo(
        textRef.current?.querySelectorAll(".animate-text") || [],
        {
          y: 50,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
        },
      )

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          scale: 1.1,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.2,
        },
      )

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll(".stat-number")

      stats?.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0")

        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Diagonal lines animation
      gsap.to(".diagonal-line", {
        x: "100%",
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[700px] h-[100vh] flex-col overflow-hidden bg-[#0d1124]"
    >
      {/* Futuristic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal speed lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="diagonal-line absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#c5203a] to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: "-100%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-20" />

        {/* Glow effects */}
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#c5203a]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#b8962e]/10 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto h-full w-full max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.div
          ref={textRef}
          style={{ y, opacity }}
          className="absolute left-[5%] bottom-8 flex max-w-[30rem] flex-col items-start gap-6 text-left sm:left-[6.5%] sm:bottom-10 lg:left-[8%] lg:bottom-16 xl:left-[9%]"
        >
            {/* Event details */}
            <div className="animate-text mb-6 flex flex-col items-start gap-2">
              <span
                className="text-base uppercase tracking-[0.35em] text-white/70 sm:text-lg"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Sat
              </span>

              <span
                className="text-[3.25rem] font-bold uppercase leading-[0.9] tracking-[0.1em] text-white sm:text-[4.5rem] lg:text-[5rem]"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                June
              </span>

              <span
                className="text-[3.25rem] font-bold uppercase leading-[0.9] tracking-[0.1em] text-white sm:text-[4.5rem] lg:text-[5rem]"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                6th
              </span>

              <span
                className="text-xl font-bold uppercase tracking-[0.3em] text-[#c5203a] sm:text-2xl"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Stereo Garden
              </span>

              <span className="text-base uppercase tracking-[0.18em] text-white/60">
                9 Railroad Ave Patchogue NY
              </span>

              <span className="text-base uppercase tracking-[0.25em] text-[#b8962e]">
                Door open 4PM
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="animate-text flex flex-wrap items-center gap-3">
              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-[#b8962e] px-6 py-3 text-sm font-bold text-[#0d1124] transition-all duration-300 hover:shadow-[0_0_25px_rgba(184,150,46,0.4)]"
              >
                <span className="editorial-button relative z-10">
                  GET TICKETS
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white transition-transform duration-300 group-hover:translate-x-0" />
              </a>

              <a
                href="#livestream"
                className="group relative overflow-hidden border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-white"
              >
                <span className="editorial-button relative z-10">
                  WATCH ON NEXTUP
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
              </a>
            </div>
          </motion.div>
      </div>

      {/* Full Background Cover Image */}
      <motion.div
        ref={imageRef}
        style={{ y: imageY }}
        className="absolute inset-0 z-[1]"
      >
        {/* HUD Frame */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Top left */}
          <div className="absolute left-6 top-6">
            <div className="h-6 w-6 border-l-2 border-t-2 border-[#c5203a]" />

            <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-[#c5203a] to-transparent" />
          </div>

          {/* Bottom right */}
          <div className="absolute bottom-6 right-6">
            <div className="ml-auto h-6 w-6 border-b-2 border-r-2 border-[#b8962e]" />

            <div className="ml-auto mt-2 h-[2px] w-12 bg-gradient-to-l from-[#b8962e] to-transparent" />
          </div>

          {/* Side accent */}
          <div className="absolute left-0 top-1/3 h-20 w-1 bg-gradient-to-b from-transparent via-[#c5203a] to-transparent" />
        </div>

        {/* Image container - full cover */}
        <motion.div
          style={{ scale }}
          className="relative h-full w-full"
        >
          <Image
            src="/hero-boxers.png"
            alt="Main event fighters image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/70 via-[#0d1124]/40 to-[#0d1124]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/50 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#0d1124] to-transparent" />
    </section>
  )
}
