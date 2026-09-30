import { createClient } from '@supabase/supabase-js'

const url =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://hvnimcrrwphzpuhpzstq.supabase.co'

const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_R3eMF7dtytSWpeFEVPXO6w_q3rPsgRS'

export const supabase = createClient(url, key)