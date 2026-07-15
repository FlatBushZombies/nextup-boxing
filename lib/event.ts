export const EVENT_CONFIG = {
  name: "Strong Island Fight Night Series 12",
  venue: "Stereo Garden",
  city: "Patchogue, NY",
  address: "9 Railroad Ave, Patchogue, NY",
  startIso: "2026-09-12T18:00:00-04:00",
  doorsIso: "2026-09-12T16:30:00-04:00",
  displayDate: "September 12, 2026",
  displayTime: "6:00 PM ET",
  doorsTime: "4:30 PM",
  homepagePath: "/",
} as const

export const EVENT_DATE = new Date(EVENT_CONFIG.startIso)

export const REMINDER_WINDOWS = {
  sevenDay: {
    key: "seven_day_reminder_sent_at",
    minimumMsUntilEvent: 24 * 60 * 60 * 1000,
    maximumMsUntilEvent: 7 * 24 * 60 * 60 * 1000,
  },
  oneDay: {
    key: "one_day_reminder_sent_at",
    minimumMsUntilEvent: 0,
    maximumMsUntilEvent: 24 * 60 * 60 * 1000,
  },
} as const

export type ReminderWindowKey = keyof typeof REMINDER_WINDOWS
export type ReminderColumnName =
  (typeof REMINDER_WINDOWS)[ReminderWindowKey]["key"]
