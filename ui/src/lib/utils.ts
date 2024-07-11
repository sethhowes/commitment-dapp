import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

import { createClient } from '@supabase/supabase-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert UNIX timestamp in milliseconds to date string
export function formatDate(timestamp: bigint) {
  const milliseconds = Number(timestamp) * 1000;
  return format(new Date(milliseconds), "MM/dd/yyyy");
};

// Get the supabase client
const SUPABASE_URL='https://lkhhxkhnqpofizjjssct.supabase.co'
const SUPABASE_API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraGh4a2hucXBvZml6ampzc2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMTA0MjAsImV4cCI6MjAyMzU4NjQyMH0.3ei2Lva0Fg7XdbwHsXc_syskWv7Q3CLyAS6eQVlNJD0'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export const getSecretsVersion = async () => {
  const { data, error } = await supabaseClient
  .from('secrets')
  .select('secrets_id')
  return data[0].secrets_id
}

export const getChainData = (chainId: number) => {
  switch (chainId) {
    case 80002:
      return {
        tokenSymbol: "MATIC",
        currencyId: "matic-network",
      }
    case 11155111:
      return {
        tokenSymbol: "ETH",
        currencyId: "ethereum",
      }
    default:
      return {
        tokenSymbol: "",
        currencyId: "matic-network", // default to MATIC if chain is unknown
      }
  }}