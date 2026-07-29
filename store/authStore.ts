import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";
import { supabase } from "../lib/supabase";

interface AuthState {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;

  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  fetchProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  loading: true,

  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  fetchProfile: async () => {
    const { session } = get();
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!error && data) {
      set({ profile: data as Profile });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },

  reset: () => set({ session: null, profile: null, loading: false }),
}));
