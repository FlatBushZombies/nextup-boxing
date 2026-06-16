"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Bell, BellOff, LogOut, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

type Tab = "events" | "notifications"

const upcomingEvents = [
  {
    id: 1,
    date: "Jul 18, 2026",
    day: "Saturday",
    title: "Fight Night XII",
    main: "MARTINEZ VS DAVIS",
    venue: "Stereo Garden, Patchogue NY",
    division: "Heavyweight",
    image: "/fighter-1.png",
  },
  {
    id: 2,
    date: "Aug 9, 2026",
    day: "Saturday",
    title: "Fight Night XIII",
    main: "SMITH VS JOHNSON",
    venue: "Stereo Garden, Patchogue NY",
    division: "Cruiserweight",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    id: 3,
    date: "Sep 20, 2026",
    day: "Saturday",
    title: "Fight Night XIV",
    main: "LOPEZ VS ANDERSON",
    venue: "Stereo Garden, Patchogue NY",
    division: "Lightweight",
    image: "/fighter-2.png",
  },
]

const notifications = [
  {
    id: 1,
    type: "event",
    title: "Fight Night XII — 7 Days Away",
    body: "Martinez vs Davis is one week out. Make sure you have your stream access ready.",
    date: "Jun 11, 2026",
    read: false,
  },
  {
    id: 2,
    type: "result",
    title: "Fight Night XI Results Are In",
    body: "Jeremy Rodriguez stopped Michael Smith in Round 4 to claim the Heavyweight title.",
    date: "Jun 6, 2026",
    read: true,
  },
  {
    id: 3,
    type: "ranking",
    title: "Rankings Updated",
    body: "Bradley Belt moves up to #3 Heavyweight following his win over Jaden Harvey.",
    date: "Jun 7, 2026",
    read: true,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { member, isLoading, signOut } = useAuth()
  const [tab, setTab] = useState<Tab>("events")
  const [notifList, setNotifList] = useState(notifications)

  useEffect(() => {
    if (!isLoading && !member) {
      router.replace("/sign-in")
    }
  }, [member, isLoading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const markRead = (id: number) => {
    setNotifList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  if (isLoading || !member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-[#e5e5e5] border-t-[#111111] rounded-full animate-spin" />
      </div>
    )
  }

  const unreadCount = notifList.filter((n) => !n.read).length

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* DASHBOARD HEADER */}
      <section className="bg-[#111111] text-white pt-28 pb-8 border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 block mb-2 font-sans">
                Member Dashboard
              </span>
              <h1 className="text-4xl sm:text-5xl font-display uppercase leading-none">
                {member.firstName} {member.lastName}
              </h1>
              <p className="text-sm text-white/50 font-sans mt-2">
                {member.email} · Member since {member.memberSince}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer font-sans shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-t border-[#222] mt-8">
            {(["events", "notifications"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-6 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer border-b-2 font-sans ${
                  tab === t
                    ? "border-crimson text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {t === "notifications" ? "Notifications" : "Upcoming Events"}
                {t === "notifications" && unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-crimson text-white text-[9px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {tab === "events" && (
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-0 border border-[#e5e5e5]">
              {upcomingEvents.map((event, i) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row items-stretch border-b border-[#e5e5e5] last:border-b-0 group"
                >
                  {/* Date */}
                  <div className="shrink-0 w-full sm:w-32 bg-[#f5f5f5] flex sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-2 px-5 py-4 sm:py-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans">{event.day}</span>
                    <span className="text-xs font-bold text-[#111111] font-sans">{event.date}</span>
                  </div>

                  {/* Image */}
                  <div className="relative shrink-0 w-full sm:w-24 h-20 sm:h-auto bg-[#111111] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.main}
                      fill
                      sizes="96px"
                      className="object-cover object-top opacity-80"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-5 py-4 flex flex-col justify-center">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson font-sans mb-1">
                      {event.title} · {event.division}
                    </span>
                    <h3 className="text-lg sm:text-xl font-display uppercase leading-none text-[#111111] mb-1.5">
                      {event.main}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#9e9ea0] font-sans">
                      <MapPin className="w-3 h-3" />
                      {event.venue}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center px-5 py-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] hover:text-[#111111] transition-colors cursor-pointer font-sans">
                      Stream →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#9e9ea0] font-sans mt-4">
              Event notifications will be sent to {member.email}
            </p>
          </div>
        </section>
      )}

      {/* NOTIFICATIONS */}
      {tab === "notifications" && (
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {notifList.length === 0 ? (
              <div className="py-20 text-center">
                <BellOff className="w-8 h-8 text-[#e5e5e5] mx-auto mb-3" />
                <p className="text-sm text-[#9e9ea0] font-sans">No notifications yet.</p>
              </div>
            ) : (
              <div className="space-y-0 border border-[#e5e5e5]">
                {notifList.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={`flex items-start gap-4 px-5 py-5 border-b border-[#e5e5e5] last:border-b-0 cursor-pointer transition-colors ${
                      notif.read ? "bg-white" : "bg-[#fafafa]"
                    } hover:bg-[#f5f5f5]`}
                  >
                    <div className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${notif.read ? "bg-[#e5e5e5]" : "bg-crimson"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <p className={`text-sm font-semibold font-sans ${notif.read ? "text-[#707072]" : "text-[#111111]"}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-[#9e9ea0] font-sans shrink-0">{notif.date}</span>
                      </div>
                      <p className="text-xs text-[#9e9ea0] font-sans mt-0.5 leading-relaxed">
                        {notif.body}
                      </p>
                    </div>
                    {!notif.read && (
                      <Bell className="shrink-0 w-3.5 h-3.5 text-crimson mt-1" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
