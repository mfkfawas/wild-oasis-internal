import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tifmndrcdtekpijptmwg.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZm1uZHJjZHRla3BpanB0bXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzE5ODMsImV4cCI6MjAzNzIwNzk4M30.a7be_w2-emzMAtQe-5n5RCE3ffxPiPOthCrCadN3d8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
