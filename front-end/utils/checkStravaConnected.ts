import { createClient } from "@supabase/supabase-js";

export default async function checkStravaConnected(walletAddress: string) {
  const supabase = createClient(
    "https://kjktqtdknkmbkmoopedk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqa3RxdGRrbmttYmttb29wZWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzOTEwOTYsImV4cCI6MTk5Mzk2NzA5Nn0.Ra6kaeHtAZAnRLi7uOEpaCiQcsp1WBIJCJvsxi0LcWE"
  );
  const { data, error } = await supabase
    .from("strava")
    .select()
    .eq("account_address", walletAddress);

    if (error) {
      console.log(error);
      return false;
    }

    if (data && data.length != 0) {
      return true;
    }
  
  return false;
}
