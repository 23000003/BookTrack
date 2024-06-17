import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfiljmekszmbpzaqaxys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmaWxqbWVrc3ptYnB6YXFheHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTQ1MTksImV4cCI6MjAyOTMzMDUxOX0.t5GOLxJHHdEAQytpgduJACIEt6HyTydp6v_1tmBDrhA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;