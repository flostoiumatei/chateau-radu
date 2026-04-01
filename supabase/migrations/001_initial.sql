-- ==============================
-- CHÂTEAU RADU DATABASE SCHEMA
-- ==============================

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website'
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

-- Tasting reservations
CREATE TABLE tasting_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date DATE,
  guests INTEGER DEFAULT 2,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- ==============================
-- ROW LEVEL SECURITY
-- ==============================

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasting_reservations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (website visitors)
CREATE POLICY "Allow anonymous insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON tasting_reservations
  FOR INSERT WITH CHECK (true);

-- ==============================
-- INDEXES
-- ==============================

-- Index for email lookups (newsletter uniqueness)
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Index for status filtering (admin dashboard)
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_reservation_status ON tasting_reservations(status);

-- Index for date filtering (reservations)
CREATE INDEX idx_reservation_date ON tasting_reservations(preferred_date);
