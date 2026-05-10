"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag, ArrowRight } from "lucide-react"

const products = [
  {
    id: "hoodie",
    name: "NextUp Champion Hoodie",
    category: "Apparel",
    price: "$89",
    badge: "Bestseller",
    colors: ["#1e2d5e", "#0d1124", "#c5203a"],
    bg: "#1e2d5e",
  },
  {
    id: "gloves",
    name: "Pro Training Gloves",
    category: "Equipment",
    price: "$65",
    badge: "New",
    colors: ["#c5203a", "#b8962e"],
    bg: "#c5203a",
  },
  {
    id: "tee",
    name: "League Edition Tee",
    category: "Apparel",
    price: "$38",
    badge: null,
    colors: ["#0d1124", "#b8962e"],
    bg: "#0d1124",
  },
  {
    id: "cap",
    name: "Signature Snapback",
    category: "Accessories",
    price: "$42",
    badge: "Limited",
    colors: ["#1e2d5e", "#b8962e", "#c5203a"],
    bg: "#b8962e",
  },
]

export function Merchandise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="merch" ref={ref} className="relative py-20 sm:py-28 bg-[#0d1124] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Official Store</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Wear the{" "}
              <span style={{ color: '#b8962e' }}>League</span>
            </motion.h2>
          </div>
          <motion.a href="#"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-[#b8962e] transition-colors group"
          >
            Shop All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative cursor-pointer"
            >
              {/* Product image area */}
              <div className="relative rounded-sm overflow-hidden mb-4 aspect-square flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2"
                style={{ background: `linear-gradient(145deg, ${p.bg} 0%, ${p.bg}cc 100%)` }}
              >
                {/* Color swatches as visual */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <ShoppingBag className="w-12 h-12 text-white/20" />
                  <div className="flex gap-2">
                    {p.colors.map((c, ci) => (
                      <div key={ci} className="w-4 h-4 rounded-full border-2 border-white/20"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>

                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      background: p.badge === "New" ? "#c5203a" : p.badge === "Limited" ? "#b8962e" : "rgba(255,255,255,0.12)",
                      color: "white",
                    }}>
                    {p.badge}
                  </div>
                )}

                {/* Hover overlay CTA */}
                <div className="absolute inset-0 bg-[#0d1124]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0d1124] font-bold uppercase tracking-[0.15em] text-xs rounded-sm">
                    Add to Cart
                  </span>
                </div>

                {/* Brand strip */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product info */}
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b8962e] mb-1 block">{p.category}</span>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#b8962e] transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.3rem' }}>
                    {p.price}
                  </span>
                  <button className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-[#b8962e] transition-colors">
                    + Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile shop all */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          className="flex justify-center mt-10 sm:hidden"
        >
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 border border-white/15 text-white font-bold uppercase tracking-[0.18em] text-sm rounded-sm hover:border-[#b8962e]/40 hover:text-[#b8962e] transition-colors">
            Shop All Products <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/15 to-transparent" />
    </section>
  )
}
