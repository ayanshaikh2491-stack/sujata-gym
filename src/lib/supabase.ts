import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table prefixes for this project
export const TABLE_PREFIX = 'sujata_gym_'

// Table names with prefix
export const TABLES = {
  MEMBERS: `${TABLE_PREFIX}members`,
  SERVICES: `${TABLE_PREFIX}services`,
  GALLERY: `${TABLE_PREFIX}gallery`,
  CONTACT_MESSAGES: `${TABLE_PREFIX}contact_messages`
} as const