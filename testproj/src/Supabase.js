import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://osqbhlxtcutooztbrlsi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcWJobHh0Y3V0b296dGJybHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4MjI2MTksImV4cCI6MjAzMjM5ODYxOX0.uUULtxk7QKlVhEG0UakJIVuNDbNmAqZb8ToNSrRlif4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;