import { supabase } from "@/lib/supabase"; // Adjust to your project's Supabase client import

export async function submitCompleteOnboarding(payload: any) {
  // Call the Postgres function named 'complete_onboarding'
  const { data, error } = await supabase.rpc("complete_onboarding", {
    p_payload: payload,
  });

  if (error) {
    throw new Error(error.message || "Failed to complete onboarding");
  }

  return data;
}
