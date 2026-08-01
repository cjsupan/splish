import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

export function useSession() {
  const { setSession, fetchProfile, reset, setLoading } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        setLoading(true);
        if (session?.user) {
          setSession(session);
          await fetchProfile(session.user.id);
        } else {
          reset();
        }
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
}
