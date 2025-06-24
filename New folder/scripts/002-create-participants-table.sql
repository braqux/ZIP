-- Run this in Supabase SQL Editor once you’re ready for real storage
CREATE TABLE IF NOT EXISTS participants (
  id BIGSERIAL PRIMARY KEY,
  serial_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  kick_username TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
