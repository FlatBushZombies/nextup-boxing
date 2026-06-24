"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { LayoutDashboard, LogOut, Loader2, ShieldCheck, X } from "lucide-react"

interface AccountExistsModalProps {
  isOpen: boolean
  avatarUrl?: string | null
  name: string
  email: string
  memberSince?: string
  onContinue: () => void
  onSwitchAccount: () => Promise<void> | void
  onClose: () => void
}

export function AccountExistsModal({
  isOpen,
  avatarUrl,
  name,
  email,
  memberSince,
  onContinue,
  onSwitchAccount,
  onClose,
}: AccountExistsModalProps) {
  const [isSwitching, setIsSwitching] = useState(false)

  const handleSwitchAccount = async () => {
    setIsSwitching(true)
    try {
      await onSwitchAccount()
    } finally {
      setIsSwitching(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative z-10 w-full max-w-[420px] overflow-hidden border border-white/10 bg-[#0c0f1e] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-[#c5203a]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center text-white/35 transition-colors hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="px-7 pb-7 pt-9">
              <div className="mb-6 pr-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-crimson font-sans">
                  Already Signed In
                </span>
                <h4 className="mt-2 text-2xl font-display uppercase tracking-tight text-white">
                  You Have An Account
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-white/50 font-sans">
                  This browser is already signed in to Next Up Boxing League. Continue to your
                  dashboard, or sign out to create an account with a different login.
                </p>
              </div>

              <div className="flex items-center gap-4 border border-white/10 bg-white/[0.04] p-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#b8962e]/30 bg-white/5">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white/60 font-sans">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white font-sans">{name}</p>
                  <p className="truncate text-xs text-white/45 font-sans">{email}</p>
                  {memberSince && (
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8962e] font-sans">
                      <ShieldCheck size={11} />
                      Member since {memberSince}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-[#b8962e] via-[#d4b65a] to-[#b8962e] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(184,150,46,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(184,150,46,0.4)] font-sans"
                >
                  <LayoutDashboard size={15} />
                  Continue to Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  disabled={isSwitching}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 border border-white/15 py-3.5 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-50 font-sans"
                >
                  {isSwitching ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Signing Out…</span>
                    </>
                  ) : (
                    <>
                      <LogOut size={15} />
                      <span>Use a Different Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
