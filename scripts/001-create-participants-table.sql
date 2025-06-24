-- Create participants table to store giveaway entries
CREATE TABLE IF NOT EXISTS participants (
  id SERIAL PRIMARY KEY,
  serial_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  kick_username VARCHAR(100),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on serial_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_participants_serial_number ON participants(serial_number);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at);
