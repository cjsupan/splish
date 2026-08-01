import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/shared/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/design/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const { email, password } = data;

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log("error: ", error);
      if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "Check your email to verify your account",
      });

      setTimeout(() => router.replace("/(auth)/login"), 1000);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primary-tint"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center gap-2 p-6">
          <Logo size={56} />

          <Text className="font-display-extrabold text-2xl text-primary-dark">
            Splish
          </Text>
        </View>
        <Text className="mt-2 text-center font-body-bold text-3xl text-text-primary">
          Getting Started
        </Text>
        <Text className="text-center font-body text-sm text-text-secondary">
          Create an account to wash smarter and stay hydrated.
        </Text>

        <View className="mt-4 flex-1 rounded-t-3xl bg-surface px-6 py-8 shadow-xl shadow-primary-dark">
          <View className="gap-5">
            <View className="gap-1">
              <Text className="font-body-medium text-sm text-text-primary">
                Email Address
              </Text>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <View
                    className={`h-14 flex-row items-center gap-3 rounded-2xl border px-4 ${
                      error?.message ? "border-danger" : "border-border"
                    }`}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={colors.secondary}
                    />

                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Enter your email"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="flex-1 font-body text-base text-text-primary"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="font-body text-xs text-danger">
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View className="gap-1">
              <Text className="font-body-medium text-sm text-text-primary">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <View
                    className={`h-14 flex-row items-center gap-3 rounded-2xl border px-4 ${
                      error?.message ? "border-danger" : "border-border"
                    }`}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={colors.secondary}
                    />

                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="default"
                      autoCapitalize="none"
                      secureTextEntry={showPassword}
                      className="flex-1 font-body text-base text-text-primary"
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="font-body text-xs text-danger">
                  {errors.password.message}
                </Text>
              )}
            </View>
            <View className="gap-1">
              <Text className="font-body-medium text-sm text-text-primary">
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <View
                    className={`h-14 flex-row items-center gap-3 rounded-2xl border px-4 ${
                      error?.message ? "border-danger" : "border-border"
                    }`}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={colors.secondary}
                    />

                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Confirm your password"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="default"
                      autoCapitalize="none"
                      secureTextEntry={showConfirmPassword}
                      className="flex-1 font-body text-base text-text-primary"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={18}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text className="font-body text-xs text-danger">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <Controller
              control={control}
              name="terms"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View className="gap-1">
                  <Pressable
                    onPress={() => onChange(!value)}
                    className="flex-row items-center gap-3 py-2"
                  >
                    <View
                      className={`h-6 w-6 items-center justify-center rounded-lg border ${
                        error
                          ? "border-danger"
                          : value
                            ? "border-primary bg-primary"
                            : "border-border bg-surface"
                      }`}
                    >
                      {value ? (
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={colors.primaryForeground}
                        />
                      ) : null}
                    </View>

                    <Text className="flex-1 font-body text-xs text-text-secondary">
                      I agree to the{" "}
                      <Text className="font-body-bold text-primary underline">
                        Terms of Service
                      </Text>{" "}
                      and{" "}
                      <Text className="font-body-bold text-primary underline">
                        Privacy Policy
                      </Text>
                    </Text>
                  </Pressable>

                  {error ? (
                    <Text className="ml-9 font-body text-xs text-danger">
                      {error.message}
                    </Text>
                  ) : null}
                </View>
              )}
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
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-center font-body-medium text-sm text-primary-dark">
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>

            <View className="mt-2 flex-row items-center justify-between gap-5">
              <View className="flex-1 border-b border-border" />
              <Text className="font-body-medium text-sm text-text-muted">
                Or
              </Text>
              <View className="flex-1 border-b border-border" />
            </View>
            {/* Social login - Google and Apple */}
            <View className="flex-row gap-4">
              <Pressable className="h-16 flex-1 items-center justify-center rounded-2xl border-2 border-border bg-surface">
                <Ionicons name="logo-google" size={20} color={colors.primary} />
              </Pressable>
              <Pressable className="h-16 flex-1 items-center justify-center rounded-2xl border-2 border-border bg-surface">
                <Ionicons name="logo-apple" size={24} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
