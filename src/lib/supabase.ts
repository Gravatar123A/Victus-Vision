import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bleehzvlzloivetnltlm.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZWVoenZsemxvaXZldG5sdGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMDQzOTgsImV4cCI6MjA4ODc4MDM5OH0.ENA79Kd8lwSjt1PPAC7x2d3A8d5E0NDRK45ocnpUcbE"
  );
}
