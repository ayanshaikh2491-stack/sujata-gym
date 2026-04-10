-- Supabase Database Setup for Sujata Gym
-- Using table prefix: sujata_gym_
-- Execute these commands in Supabase SQL Editor

-- 1. Members table
CREATE TABLE IF NOT EXISTS sujata_gym_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  membership_type TEXT DEFAULT 'basic',
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Services table
CREATE TABLE IF NOT EXISTS sujata_gym_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration_months INTEGER DEFAULT 1,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gallery table
CREATE TABLE IF NOT EXISTS sujata_gym_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Contact messages table
CREATE TABLE IF NOT EXISTS sujata_gym_contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sujata_gym_members_email ON sujata_gym_members(email);
CREATE INDEX IF NOT EXISTS idx_sujata_gym_members_membership_type ON sujata_gym_members(membership_type);
CREATE INDEX IF NOT EXISTS idx_sujata_gym_services_active ON sujata_gym_services(is_active);
CREATE INDEX IF NOT EXISTS idx_sujata_gym_gallery_category ON sujata_gym_gallery(category);
CREATE INDEX IF NOT EXISTS idx_sujata_gym_contact_messages_status ON sujata_gym_contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_sujata_gym_contact_messages_created_at ON sujata_gym_contact_messages(created_at);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE sujata_gym_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sujata_gym_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE sujata_gym_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE sujata_gym_contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all operations for now - adjust based on requirements)
-- Members: Allow authenticated users to read their own data
CREATE POLICY "Allow all operations on members" ON sujata_gym_members FOR ALL USING (true);

-- Services: Allow public read access
CREATE POLICY "Allow public read on services" ON sujata_gym_services FOR SELECT USING (true);
CREATE POLICY "Allow admin operations on services" ON sujata_gym_services FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Gallery: Allow public read access
CREATE POLICY "Allow public read on gallery" ON sujata_gym_gallery FOR SELECT USING (true);
CREATE POLICY "Allow admin operations on gallery" ON sujata_gym_gallery FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Contact Messages: Allow public insert, admin read/update
CREATE POLICY "Allow public insert on contact messages" ON sujata_gym_contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin operations on contact messages" ON sujata_gym_contact_messages FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample data
INSERT INTO sujata_gym_services (name, description, price, duration_months, features) VALUES
('Basic Membership', 'Access to gym facilities and basic equipment', 29.99, 1, '["24/7 access", "Basic equipment", "Locker room"]'),
('Premium Membership', 'Full access with personal training sessions', 49.99, 1, '["Everything in Basic", "2 PT sessions/month", "Nutrition consultation"]'),
('Elite Membership', 'VIP experience with unlimited training', 89.99, 1, '["Everything in Premium", "Unlimited PT", "Massage therapy", "VIP lounge"]');

INSERT INTO sujata_gym_gallery (title, description, category, display_order) VALUES
('Main Gym Floor', 'State-of-the-art equipment and spacious workout areas', 'facilities', 1),
('Strength Training Zone', 'Olympic weightlifting platform and free weights', 'equipment', 2),
('Cardio Area', 'Latest cardio machines with entertainment systems', 'equipment', 3),
('Group Fitness Studio', 'Versatile space for yoga, pilates, and group classes', 'facilities', 4);

-- Success message
SELECT 'Sujata Gym database setup completed successfully!' as status;