-- Email subscribers table for newsletter sign-ups and event notifications
CREATE TABLE IF NOT EXISTS email_subscribers (
  email             text        PRIMARY KEY,
  name              text,
  first_name        text,
  last_name         text,
  source            text        NOT NULL DEFAULT 'hero-section',
  cell_number       text,
  location          text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  seven_day_reminder_sent_at  timestamptz,
  one_day_reminder_sent_at    timestamptz,
  last_notified_at            timestamptz
);

-- Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Service role (used by the Next.js API routes) has full access
CREATE POLICY "service_role_all" ON email_subscribers
  USING (true)
  WITH CHECK (true);
