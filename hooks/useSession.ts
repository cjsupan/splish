import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

export function useSession() {
  const { setSession, setLoading, fetchProfile, reset } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        reset();
      }

      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);

      if (session?.user) {
        setSession(session);
        await fetchProfile(session.user.id);
      } else {
        reset();
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
}
