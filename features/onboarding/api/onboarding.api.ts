import { supabase } from "@/lib/supabase";

export async function submitCompleteOnboarding(payload: any) {
  const { data, error } = await supabase.rpc("complete_onboarding", {
    p_payload: payload,
  });

  if (error) {
    console.log("Error in complete_onboarding", error);
    throw new Error(error.message || "Failed to complete onboarding");
  }

  return data;
}
