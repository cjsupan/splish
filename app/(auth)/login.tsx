import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { colors } from "@/constants/design/theme";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import Logo from "@/components/shared/Logo";

import { Input } from "@/components/ui/Input";
import Toast from "react-native-toast-message";
import { FormInput } from "@/components/ui/FormInput";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: error.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary-tint">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView className="flex-1 bg-gradient-to-b from-primary-dark to-primary">
          <View className="flex-row items-center gap-2 p-6">
            <Logo size={56} />

            <Text className="font-display-extrabold text-2xl text-primary-dark">
              Splish
            </Text>
          </View>

          <Text className="mt-8 text-center font-body-bold text-3xl text-text-primary">
            Welcome back
          </Text>
          <Text className="text-center font-body text-sm text-text-secondary">
            Sign in to manage and book your fresh daily essentials.
          </Text>

          <View className="mt-24 flex-1 rounded-t-3xl bg-surface px-6 py-8 shadow-xl shadow-primary-dark">
            <View className="gap-5">
              <FormInput
                name="email"
                label="Email Address"
                iconName="mail-outline"
                iconColor={colors.secondary}
                control={control}
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormInput
                name="password"
                label="Password"
                iconName="lock-closed-outline"
                iconColor={colors.secondary}
                control={control}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={showPassword}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>
                }
              />

              <TouchableOpacity
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
                className={`h-14 items-center justify-center rounded-2xl ${!loading ? "bg-primary" : "bg-primary opacity-disabled"}`}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primaryForeground} />
                ) : (
                  <Text className="font-body-bold text-base text-primary-foreground">
                    Login
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-center font-body-medium text-sm text-primary-dark">
                  Create an account
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="mt-8 flex-row items-center justify-between gap-5">
              <View className="flex-1 border-b border-border" />
              <Text className="font-body-medium text-sm text-text-muted">
                Or
              </Text>
              <View className="flex-1 border-b border-border" />
            </View>

            {/* Social login - Google and Apple */}
            <View className="mt-8 gap-5">
              <TouchableOpacity
                onPress={() => {}}
                className="flex-row items-center justify-center gap-2 rounded-2xl border-2 border-border bg-surface py-4"
              >
                <Ionicons name="logo-google" size={20} color={colors.primary} />
                <Text className="font-body-bold text-base text-text-primary">
                  Sign in with Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="flex-row items-center justify-center gap-2 rounded-2xl border-2 border-border bg-surface py-4"
              >
                <Ionicons name="logo-apple" size={20} color={colors.primary} />
                <Text className="font-body-bold text-base text-text-primary">
                  Sign in with Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
