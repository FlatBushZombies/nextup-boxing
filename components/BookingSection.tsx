"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

const weightClasses = [
  "Heavyweight",
  "Cruiserweight",
  "Light-Heavyweight",
  "Super-Middleweight",
  "Middleweight",
  "Super-Welterweight",
  "Welterweight",
  "Super-Lightweight",
  "Lightweight",
  "Super-Featherweight",
  "Featherweight",
  "Super-Bantamweight",
  "Bantamweight",
  "Super-Flyweight",
  "Flyweight",
  "Light-Flyweight",
  "Minimumweight",
]

const FIELD = "w-full bg-transparent border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-sans"
const LABEL = "text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 font-sans block mb-2"

export function BookingSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weightClass: "",
    record: "",
    gym: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/book-spot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.")
        setStatus("error")
      } else {
        setStatus("success")
      }
    } catch {
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  return (
    <section id="book-spot" className="relative bg-[#111111] border-t border-[#1a1a1a] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Copy */}
          <div className="lg:sticky lg:top-32">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-crimson block mb-6 font-sans">
              Next Up Boxing League
            </span>
            <h2 className="text-6xl md:text-7xl lg:text-[80px] font-display uppercase leading-none text-white mb-8">
              Book<br />Your<br />Spot.
            </h2>
            <div className="w-12 h-[3px] bg-crimson mb-8" />
            <p className="text-sm text-white/50 font-sans leading-relaxed max-w-xs mb-10">
              Ready to compete on Long Island's premier boxing stage? Submit your details and our team will contact you within 48 hours.
            </p>

            <ul className="space-y-3.5 mb-12">
              {[
                "Amateur & professional fighters welcome",
                "All weight classes considered",
                "Fight nights at Stereo Garden, Patchogue NY",
                "Fair matchmaking, full support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/40 font-sans">
                  <span className="w-[5px] h-[5px] bg-crimson mt-1.5 shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 font-sans mb-2">
                Inquiries
              </p>
              <p className="text-sm text-white/60 font-sans">631-295-0061</p>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {status === "success" ? (
              <div className="flex flex-col items-start gap-6 py-16">
                <CheckCircle className="w-10 h-10 text-crimson" strokeWidth={1.5} />
                <div>
                  <h3 className="text-2xl font-display uppercase text-white mb-3">
                    Request Received.
                  </h3>
                  <p className="text-sm text-white/50 font-sans leading-relaxed max-w-sm">
                    We've got your details. Someone from the Next Up team will reach out within 48 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setStatus("idle"); setForm({ firstName: "", lastName: "", email: "", phone: "", weightClass: "", record: "", gym: "", message: "" }) }}
                  className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors font-sans mt-2"
                >
                  Submit another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>First Name <span className="text-crimson">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={set("firstName")}
                      placeholder="Arturo"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Last Name <span className="text-crimson">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={set("lastName")}
                      placeholder="Acevedo"
                      className={FIELD}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={LABEL}>Email <span className="text-crimson">*</span></label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="fighter@gym.com"
                    className={FIELD}
                  />
                </div>

                {/* Phone / Weight class row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="(631) 000-0000"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Weight Class <span className="text-crimson">*</span></label>
                    <select
                      required
                      value={form.weightClass}
                      onChange={set("weightClass")}
                      className={`${FIELD} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select…</option>
                      {weightClasses.map((w) => (
                        <option key={w} value={w} className="bg-[#111111] text-white">
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Record / Gym row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Record (W-L-D)</label>
                    <input
                      type="text"
                      value={form.record}
                      onChange={set("record")}
                      placeholder="12-2-0"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Gym / Trainer</label>
                    <input
                      type="text"
                      value={form.gym}
                      onChange={set("gym")}
                      placeholder="Gleason's Gym"
                      className={FIELD}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={LABEL}>Anything else we should know?</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Amateur or pro, preferred fight dates, belt goals…"
                    className={`${FIELD} resize-none`}
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-crimson font-sans">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full flex items-center justify-between bg-crimson px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#a50d24] disabled:opacity-50 disabled:cursor-not-allowed font-sans mt-2"
                >
                  {status === "loading" ? "Sending…" : "Book My Spot"}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-[10px] text-white/25 font-sans leading-relaxed">
                  Required fields marked <span className="text-crimson">*</span>. Your info is never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
