import { useEffect } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  Geist_800ExtraBold,
} from "@expo-google-fonts/geist";
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
} from "@expo-google-fonts/space-mono";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/global.css";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/ui/Toast";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { setSession, fetchProfile, setLoading } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
    Geist_800ExtraBold,

    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,

    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Global Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile();
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, setSession, setLoading]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(customer)" />
              <Stack.Screen name="(owner)" />
            </Stack>
            <Toast config={toastConfig} topOffset={50} />
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
