"use client"

import { motion } from "framer-motion"
import { ExternalLink, Heart, MessageCircle, Play } from "lucide-react"

const INSTAGRAM_HANDLE = "kristiandvasquez"
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`

// Curated reel data — these represent the latest posts from @kristiandvasquez
// In production, you'd fetch these via Instagram Basic Display API or a social aggregator
const reelPosts = [
  {
    id: "reel-1",
    thumbnail: null,
    caption: "Fight night prep 🥊 Getting ready for the biggest event of the year",
    likes: "2.4K",
    comments: "187",
    isVideo: true,
  },
  {
    id: "reel-2",
    thumbnail: null,
    caption: "Behind the scenes at training camp 💪",
    likes: "1.8K",
    comments: "142",
    isVideo: true,
  },
  {
    id: "reel-3",
    thumbnail: null,
    caption: "When the crowd goes wild 🔥 #NextUpBoxing",
    likes: "3.1K",
    comments: "256",
    isVideo: true,
  },
  {
    id: "reel-4",
    thumbnail: null,
    caption: "Road to the championship 🏆",
    likes: "2.9K",
    comments: "203",
    isVideo: true,
  },
  {
    id: "reel-5",
    thumbnail: null,
    caption: "Training never stops 💯",
    likes: "1.5K",
    comments: "98",
    isVideo: true,
  },
  {
    id: "reel-6",
    thumbnail: null,
    caption: "Weigh-in day vibes ⚡",
    likes: "4.2K",
    comments: "312",
    isVideo: true,
  },
]

// Gradient placeholders for the reel thumbnails
const gradients = [
  "linear-gradient(135deg, #1e2d5e 0%, #c5203a 50%, #b8962e 100%)",
  "linear-gradient(135deg, #c5203a 0%, #0d1124 60%, #b8962e 100%)",
  "linear-gradient(135deg, #b8962e 0%, #1e2d5e 50%, #c5203a 100%)",
  "linear-gradient(135deg, #0d1124 0%, #c5203a 40%, #1e2d5e 100%)",
  "linear-gradient(135deg, #c5203a 0%, #b8962e 50%, #0d1124 100%)",
  "linear-gradient(135deg, #1e2d5e 0%, #b8962e 60%, #c5203a 100%)",
]

export function SocialWall() {
  return (
    <section
      id="social-wall"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: '#0d1124' }}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
          mixBlendMode: 'overlay',
          opacity: 0.5,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(197, 32, 58, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Editorial label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#c5203a]" />
            <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
              Social Wall
            </span>
            <span className="h-px w-10 bg-[#c5203a]" />
          </div>

          <h2
            className="uppercase leading-[0.9] mb-4"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              color: 'white',
            }}
          >
            Follow The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c5203a 0%, #b8962e 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Action
            </span>
          </h2>

          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Stay connected with the latest reels and behind-the-scenes content from our Instagram
          </p>
        </motion.div>

        {/* Instagram Profile Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 px-6 py-4 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar with Instagram gradient ring */}
            <div
              className="relative w-14 h-14 rounded-full p-[2.5px] flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-[#0d1124] flex items-center justify-center overflow-hidden">
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
                >
                  KV
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">@{INSTAGRAM_HANDLE}</span>
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)',
                    color: 'white',
                  }}
                >
                  Reels
                </span>
              </div>
              <p className="text-white/35 text-xs mt-0.5">Next Up Boxing · Content Creator</p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group"
            style={{
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: 'white',
            }}
          >
            
            Follow
            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {reelPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer"
              style={{
                background: gradients[index % gradients.length],
              }}
            >
              {/* Animated gradient shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer-gradient 3s ease-in-out infinite',
                }}
              />

              {/* Play button indicator */}
              {post.isVideo && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-all duration-300">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              )}

              {/* Instagram Reel icon */}
              <div className="absolute top-3 left-3 z-10">
                <svg
                  className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.042-.379 3.408 3.408 0 0 1-1.265-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.51 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.27 1.949 8.074 8.074 0 0 0-.51 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .51 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.949 1.27 8.074 8.074 0 0 0 2.67.51C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.51 5.625 5.625 0 0 0 3.219-3.219 8.074 8.074 0 0 0 .51-2.67C22.987 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.51-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.949-1.27 8.074 8.074 0 0 0-2.67-.51C15.362 1.013 14.987 1 12 1z" />
                  <path d="M12 6.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667z" />
                  <circle cx="17.872" cy="6.128" r="1.32" />
                </svg>
              </div>

              {/* Bottom content overlay */}
              <div
                className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }}
              >
                <p className="text-white text-[10px] leading-tight line-clamp-2 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-white/60 text-[9px]">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-white/60 text-[9px]">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Hover scale effect on the background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  background: gradients[index % gradients.length],
                  opacity: 0.4,
                }}
              />

              {/* Animated boxing icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/10 group-hover:text-white/20 transition-colors duration-500">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M18 11V6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v0M6 11V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v0" />
                    <path d="M4 11h16v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5z" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Instagram embed — live feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Embedded Instagram Post */}
          <div
            className="rounded-xl overflow-hidden p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              
              <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                Latest Post
              </span>
            </div>
            <div className="w-full aspect-square rounded-lg overflow-hidden">
              <iframe
                src={`https://www.instagram.com/${INSTAGRAM_HANDLE}/embed`}
                className="w-full h-full border-0"
                scrolling="no"
                allowTransparency
                loading="lazy"
                title="Instagram Feed"
              />
            </div>
          </div>

          {/* CTA Card */}
          <div
            className="rounded-xl overflow-hidden p-8 flex flex-col justify-center items-center text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(197, 32, 58, 0.08) 0%, rgba(30, 45, 94, 0.08) 50%, rgba(184, 150, 46, 0.06) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="w-20 h-20 rounded-full p-[3px] mb-6"
              style={{
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-[#0d1124] flex items-center justify-center">
                
              </div>
            </div>

            <h3
              className="text-white uppercase mb-3"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              }}
            >
              Don&apos;t Miss A Moment
            </h3>

            <p className="text-white/35 text-sm max-w-sm mb-8 leading-relaxed">
              Follow @{INSTAGRAM_HANDLE} for exclusive behind-the-scenes content, 
              fight highlights, training footage, and real-time updates.
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
              style={{
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              }}
            >
              Follow on Instagram
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
              <div className="text-center">
                <span
                  className="block text-white leading-none"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '1.5rem',
                    color: '#b8962e',
                  }}
                >
                  LIVE
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Updates</span>
              </div>
              <div className="w-px h-8 bg-white/8" />
              <div className="text-center">
                <span
                  className="block text-white leading-none"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '1.5rem',
                    color: '#b8962e',
                  }}
                >
                  BTS
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Content</span>
              </div>
              <div className="w-px h-8 bg-white/8" />
              <div className="text-center">
                <span
                  className="block text-white leading-none"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '1.5rem',
                    color: '#b8962e',
                  }}
                >
                  24/7
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Coverage</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Follow social links bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20"
        >
          <span className="h-px w-8 bg-white/10" />
          Follow All The Action
          <span className="h-px w-8 bg-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
