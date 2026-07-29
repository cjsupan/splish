import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

/**
 * Call once in the root _layout.
 * Syncs the Supabase session into Zustand and fetches the profile on sign-in.
 */
export function useSession() {
  const { setSession, setLoading, fetchProfile } = useAuthStore();

  useEffect(() => {
    // Get the initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile();
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchProfile();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
}
