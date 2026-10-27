import { createClient } from "@supabase/supabase-js";

// ── Paste your Supabase project values here ──────────────────────────
// Supabase dashboard → Project Settings → API
// (The anon key is safe to keep in the code: the database is protected
// by Row Level Security, so users can only ever access their own rows.)
const SUPABASE_URL = "https://akiyqwgnazsaqdxormsv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9pfkEXIC2aORWcGNnHGG9A_b63-iQEc";
// ─────────────────────────────────────────────────────────────────────

export const isSupabaseConfigured = SUPABASE_URL.startsWith("https://");

export const supabase = createClient(
  isSupabaseConfigured ? SUPABASE_URL : "https://placeholder.supabase.co",
  isSupabaseConfigured ? SUPABASE_ANON_KEY : "placeholder"
);
