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
  fetchProfile: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  loading: true,

  setSession: (session) => set({ session }),

  setProfile: (profile) => set({ profile }),

  setLoading: (loading) => set({ loading }),

  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      set({
        profile: data as Profile,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);

      set({
        profile: null,
      });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();

    set({
      session: null,
      profile: null,
    });
  },

  reset: () =>
    set({
      session: null,
      profile: null,
    }),
}));
