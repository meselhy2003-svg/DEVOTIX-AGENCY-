import { createClient } from '@supabase/supabase-js';

// Configuration keys for localStorage override
const LS_SUPABASE_URL = 'devotix_supabase_url';
const LS_SUPABASE_ANON_KEY = 'devotix_supabase_anon_key';

// 1. Get current Supabase config (env variable or custom saved in dashboard)
export function getSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const savedUrl = typeof window !== 'undefined' ? localStorage.getItem(LS_SUPABASE_URL) : '';
  const savedKey = typeof window !== 'undefined' ? localStorage.getItem(LS_SUPABASE_ANON_KEY) : '';

  return {
    url: (savedUrl || envUrl || '').trim(),
    anonKey: (savedKey || envKey || '').trim(),
    isEnv: Boolean(envUrl && envKey && !savedUrl),
  };
}

export function saveSupabaseConfig(url, anonKey) {
  if (typeof window === 'undefined') return;
  if (!url && !anonKey) {
    localStorage.removeItem(LS_SUPABASE_URL);
    localStorage.removeItem(LS_SUPABASE_ANON_KEY);
  } else {
    localStorage.setItem(LS_SUPABASE_URL, (url || '').trim());
    localStorage.setItem(LS_SUPABASE_ANON_KEY, (anonKey || '').trim());
  }
  // Re-instantiate client
  _supabaseInstance = null;
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http'));
}

// 2. Client singleton instance
let _supabaseInstance = null;

export function getSupabaseClient() {
  if (_supabaseInstance) return _supabaseInstance;
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey || !url.startsWith('http')) return null;

  try {
    _supabaseInstance = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    return _supabaseInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

// 3. Test Supabase connection
export async function testSupabaseConnection(overrideUrl, overrideKey) {
  try {
    const url = (overrideUrl || getSupabaseConfig().url || '').trim();
    const key = (overrideKey || getSupabaseConfig().anonKey || '').trim();
    if (!url || !key) return { success: false, message: 'URL or Anon Key is missing' };

    const client = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await client.from('devotix_cms').select('key').limit(1);

    if (error) {
      // Table might not exist yet
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return {
          success: false,
          needsTable: true,
          message: 'Table "devotix_cms" not found in Supabase. Please run the SQL setup script.',
        };
      }
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Successfully connected to Supabase!', rowCount: data?.length || 0 };
  } catch (err) {
    return { success: false, message: err.message || 'Connection test failed' };
  }
}

// 4. Fetch specific key from devotix_cms
export async function fetchCmsKeyFromSupabase(key, fallbackValue) {
  const client = getSupabaseClient();
  if (!client) return fallbackValue;

  try {
    const { data, error } = await client
      .from('devotix_cms')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (error || !data || data.value === undefined || data.value === null) {
      return fallbackValue;
    }

    return data.value;
  } catch (err) {
    console.warn(`[Supabase] Failed to fetch key "${key}":`, err);
    return fallbackValue;
  }
}

// 5. Save/Upsert specific key into devotix_cms
export async function saveCmsKeyToSupabase(key, value) {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('devotix_cms')
      .upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      );

    if (error) {
      console.error(`[Supabase] Error saving key "${key}":`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception saving key "${key}":`, err);
    return false;
  }
}

// 6. Fetch ALL keys at once on initial load
export async function fetchAllCmsDataFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('devotix_cms').select('key, value');
    if (error || !data) return null;

    const result = {};
    data.forEach((row) => {
      result[row.key] = row.value;
    });
    return result;
  } catch (err) {
    console.warn('[Supabase] Failed to bulk fetch CMS data:', err);
    return null;
  }
}

// 7. Bulk Sync all local datasets up to Supabase
export async function bulkSyncToSupabase(allDatasets) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase is not configured yet');

  const rows = Object.entries(allDatasets).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await client.from('devotix_cms').upsert(rows, { onConflict: 'key' });
  if (error) throw error;
  return true;
}

// 8. SQL script to create the table in Supabase SQL editor
export const SUPABASE_SQL_SETUP = `-- Devotix CMS Table Setup
CREATE TABLE IF NOT EXISTS public.devotix_cms (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.devotix_cms ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so any visitor sees photos & cover)
CREATE POLICY "Allow public read access"
ON public.devotix_cms
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow public insert/update (for CMS admin)
CREATE POLICY "Allow public insert and update"
ON public.devotix_cms
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);
`;
