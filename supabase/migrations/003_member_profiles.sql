-- Member onboarding profiles collected after Google sign-in (Clerk user id is the key)
CREATE TABLE IF NOT EXISTS member_profiles (
  clerk_user_id           text        PRIMARY KEY,
  email                   text        NOT NULL,
  first_name              text,
  last_name               text,
  phone                   text        NOT NULL,
  location                text        NOT NULL,
  data_policy_accepted_at timestamptz NOT NULL,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Service role (used by the Next.js API routes) has full access
CREATE POLICY "service_role_all" ON member_profiles
  USING (true)
  WITH CHECK (true);
