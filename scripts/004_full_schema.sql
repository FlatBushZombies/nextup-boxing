-- =============================================================
-- Next Up Boxing League — Full Database Schema
-- File: scripts/004_full_schema.sql
-- Run this in your Supabase SQL editor after the auth schema
-- is in place (Supabase Auth creates the auth.users table).
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. USER PROFILES
--    Extends Supabase Auth users with boxing-specific profile data.
--    Linked 1-to-1 with auth.users via user_id.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name      TEXT,
    last_name       TEXT,
    notifications   BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile"       ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile"     ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile"     ON user_profiles;
DROP POLICY IF EXISTS "Service role full access to profiles"   ON user_profiles;

CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access to profiles"
    ON user_profiles FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

-- Auto-create a profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO user_profiles (user_id, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ─────────────────────────────────────────────────────────────
-- 2. FIGHTERS
--    Core roster table for all Next Up Boxing League athletes.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fighters (
    id              BIGSERIAL PRIMARY KEY,
    full_name       TEXT NOT NULL,
    nickname        TEXT,
    division        TEXT NOT NULL,
    wins            INT NOT NULL DEFAULT 0,
    losses          INT NOT NULL DEFAULT 0,
    draws           INT NOT NULL DEFAULT 0,
    kos             INT NOT NULL DEFAULT 0,
    country         TEXT,
    flag_emoji      TEXT,
    image_path      TEXT,
    is_champion     BOOLEAN NOT NULL DEFAULT false,
    title_label     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fighters_division  ON fighters(division);
CREATE INDEX IF NOT EXISTS idx_fighters_champion  ON fighters(is_champion);

ALTER TABLE fighters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view fighters"              ON fighters;
DROP POLICY IF EXISTS "Service role full access to fighters"  ON fighters;

CREATE POLICY "Anyone can view fighters"
    ON fighters FOR SELECT USING (true);

CREATE POLICY "Service role full access to fighters"
    ON fighters FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- 3. EVENTS
--    Scheduled and completed fight night events.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    event_date      DATE NOT NULL,
    venue           TEXT,
    city            TEXT,
    status          TEXT NOT NULL DEFAULT 'upcoming'
                    CHECK (status IN ('upcoming', 'live', 'completed', 'cancelled')),
    stream_url      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date    ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status  ON events(status);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view events"              ON events;
DROP POLICY IF EXISTS "Service role full access to events"  ON events;

CREATE POLICY "Anyone can view events"
    ON events FOR SELECT USING (true);

CREATE POLICY "Service role full access to events"
    ON events FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- 4. FIGHT RESULTS
--    Individual bout results tied to an event and two fighters.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fight_results (
    id              BIGSERIAL PRIMARY KEY,
    event_id        BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    winner_id       BIGINT NOT NULL REFERENCES fighters(id),
    loser_id        BIGINT NOT NULL REFERENCES fighters(id),
    division        TEXT NOT NULL,
    method          TEXT NOT NULL CHECK (method IN ('KO','TKO','UD','MD','SD','PTS','DQ','NC','Draw')),
    round           SMALLINT,
    is_title_fight  BOOLEAN NOT NULL DEFAULT false,
    title_label     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fight_results_event   ON fight_results(event_id);
CREATE INDEX IF NOT EXISTS idx_fight_results_winner  ON fight_results(winner_id);
CREATE INDEX IF NOT EXISTS idx_fight_results_loser   ON fight_results(loser_id);

ALTER TABLE fight_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view fight results"              ON fight_results;
DROP POLICY IF EXISTS "Service role full access to fight results"  ON fight_results;

CREATE POLICY "Anyone can view fight results"
    ON fight_results FOR SELECT USING (true);

CREATE POLICY "Service role full access to fight results"
    ON fight_results FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- 5. RANKINGS
--    Official weekly rankings per division.
--    Each row is a ranked position at a point in time.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rankings (
    id              BIGSERIAL PRIMARY KEY,
    fighter_id      BIGINT NOT NULL REFERENCES fighters(id) ON DELETE CASCADE,
    division        TEXT NOT NULL,
    position        SMALLINT NOT NULL,
    points          INT NOT NULL DEFAULT 0,
    previous_pos    SMALLINT,
    ranked_at       DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rankings_division  ON rankings(division);
CREATE INDEX IF NOT EXISTS idx_rankings_date      ON rankings(ranked_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_rankings_unique
    ON rankings(fighter_id, division, ranked_at);

ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view rankings"              ON rankings;
DROP POLICY IF EXISTS "Service role full access to rankings"  ON rankings;

CREATE POLICY "Anyone can view rankings"
    ON rankings FOR SELECT USING (true);

CREATE POLICY "Service role full access to rankings"
    ON rankings FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- 6. NOTIFICATIONS (user inbox)
--    System-generated messages delivered to a member's dashboard.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type            TEXT NOT NULL CHECK (type IN ('event','result','ranking','general')),
    title           TEXT NOT NULL,
    body            TEXT,
    read            BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user  ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read  ON notifications(user_id, read);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notifications"    ON notifications;
DROP POLICY IF EXISTS "Users can mark their notifications read"   ON notifications;
DROP POLICY IF EXISTS "Service role full access to notifications" ON notifications;

CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can mark their notifications read"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to notifications"
    ON notifications FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────
-- COMMENTS
-- ─────────────────────────────────────────────────────────────
COMMENT ON TABLE user_profiles   IS 'Extended profile data for auth.users — linked by user_id.';
COMMENT ON TABLE fighters        IS 'Next Up Boxing League athlete roster.';
COMMENT ON TABLE events          IS 'Scheduled and completed fight night events.';
COMMENT ON TABLE fight_results   IS 'Individual bout outcomes tied to an event.';
COMMENT ON TABLE rankings        IS 'Weekly divisional rankings snapshot.';
COMMENT ON TABLE notifications   IS 'Per-user dashboard notification inbox.';
