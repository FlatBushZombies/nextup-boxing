import Image from "next/image"
import { MapPin, Ticket } from "lucide-react"
import { Reveal } from "@/components/Reveal"

const events = [
  {
    id: 1,
    date: "Sat, Jun 27",
    title: "ZAYAS VS ENNIS",
    location: "Barclays Center | Brooklyn, New York City",
    broadcaster: "DAZN",
    image: "/fighter-1.png",
  },
  {
    id: 2,
    date: "Sat, Jul 4 / 8:00 PM ET",
    title: "MASON VS CORDINA",
    location: "CSU Wolstein Center | Cleveland, Ohio",
    broadcaster: "TNT and DAZN",
    image: "/fighter-2.png",
  },
]

export function EventsSection() {
  return (
    <section id="events" className="relative w-full scroll-mt-20 overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Reveal as="fade-up" className="mb-10">
          <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-crimson">
            Upcoming Events
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {events.map((event, index) => {
          const isDark = index % 2 === 1

          return (
            <Reveal key={event.id} as="fade-up" delay={index * 60}>
              <div className={`${isDark ? "bg-[#111111]" : "bg-white"} border-t border-[#e5e5e5]`}>
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Image & Info */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="relative h-56 w-full shrink-0 overflow-hidden bg-[#f5f5f5] md:h-[180px] md:w-[320px]">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className={`mb-1 text-sm font-medium ${isDark ? "text-white/60" : "text-[#707072]"}`}>
                          {event.date}
                        </span>

                        <h3 className={`mb-3 text-2xl md:text-3xl font-medium uppercase tracking-wide ${isDark ? "text-white" : "text-[#111111]"}`}>
                          {event.title}
                        </h3>

                        <div className={`mb-1 flex items-center gap-1.5 text-sm font-normal ${isDark ? "text-white/70" : "text-[#707072]"}`}>
                          <MapPin className="h-[14px] w-[14px]" />
                          {event.location}
                        </div>

                        <span className={`text-sm font-normal ${isDark ? "text-white/50" : "text-[#9e9ea0]"}`}>
                          {event.broadcaster}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="flex w-full shrink-0 md:ml-4 md:w-auto">
                      <button
                        className={`flex h-[50px] md:h-[60px] w-full md:w-[180px] items-center justify-center gap-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors ${
                          isDark ? "bg-white text-[#111111] hover:bg-[#e5e5e5]" : "bg-[#111111] text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <Ticket className="h-4 w-4" />
                        Buy Tickets
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
