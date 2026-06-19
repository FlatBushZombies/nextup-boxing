-- Fighter booking requests submitted via the /boxers page
CREATE TABLE IF NOT EXISTS fight_bookings (
  id              bigint        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name      text          NOT NULL,
  last_name       text          NOT NULL,
  email           text          NOT NULL,
  phone           text,
  weight_class    text          NOT NULL,
  record          text,
  gym             text,
  message         text,
  status          text          NOT NULL DEFAULT 'pending',
  created_at      timestamptz   NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE fight_bookings ENABLE ROW LEVEL SECURITY;

-- Service role (used by Next.js API routes) has full access
CREATE POLICY "service_role_all" ON fight_bookings
  USING (true)
  WITH CHECK (true);
