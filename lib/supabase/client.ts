"use client";
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

export const createClient = () =>
  isSupabaseConfigured ? createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
