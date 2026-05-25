import Image from "next/image"
import Link from "next/link"
import { MapPin, Ticket } from "lucide-react"

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
    <section
      id="events"
      className="relative w-full scroll-mt-20 overflow-hidden bg-white py-16 md:py-24"
    >
      {/* Background TEXT */}
      <div className="pointer-events-none absolute left-0 right-0 top-10 flex justify-center overflow-hidden">
        <span className="select-none text-[15rem] font-black leading-none tracking-tighter text-[#f8f8f8] uppercase">
          EVENTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6">
            <button className="text-xl font-bold tracking-tight text-[#c5203a]">
              UPCOMING
            </button>
          </div>
        </div>

        {/* Event List */}
        <div className="flex flex-col gap-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            >
              {/* Image & Info Wrapper */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Image */}
                <div className="relative h-56 w-full shrink-0 overflow-hidden bg-gray-100 md:h-[180px] md:w-[320px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <span className="mb-1 text-[13px] font-bold text-[#b8962e]">
                    {event.date}
                  </span>

                  <h3
                    className="mb-3 text-[2.5rem] leading-[0.9] font-bold tracking-tight text-[#1e2d5e] uppercase italic"
                    style={{
                      fontFamily: "var(--font-bebas), Impact, sans-serif",
                    }}
                  >
                    {event.title}
                  </h3>

                  <div className="mb-1 flex items-center gap-1.5 text-[13px] font-medium text-gray-700">
                    <MapPin className="h-[14px] w-[14px] text-[#c5203a]" />
                    {event.location}
                  </div>

                  <span className="text-[13px] font-medium text-gray-500">
                    {event.broadcaster}
                  </span>
                </div>
              </div>

              {/* Button */}
              <div className="flex h-[50px] w-full shrink-0 flex-row md:ml-4 md:h-[60px] md:w-auto">
                <button className="flex h-full flex-1 items-center justify-center gap-2 bg-[#1e2d5e] px-6 text-[13px] font-bold text-white transition-colors hover:bg-[#141f45] md:w-[160px]">
                  <Ticket className="h-4 w-4" />
                  BUY TICKETS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}