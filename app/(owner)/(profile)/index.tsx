import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lucide } from "@react-native-vector-icons/lucide";
import { useAuthStore } from "@/store/authStore";
import { colors } from "@/constants/design/theme";
import { router } from "expo-router";

const menuItems = [
  { label: "My Addresses", icon: "map-pin" },
  { label: "Payment Methods", icon: "credit-card" },
  { label: "Favorites", icon: "heart" },
  { label: "Notification", icon: "bell" },
  { label: "Help & Support", icon: "life-buoy" },
  { label: "Terms & Privacy", icon: "file-text" },
] as const;

export default function OwnerProfileScreen() {
  const { profile, session, signOut } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 gap-6 bg-primary-tint px-5">
      <View className="flex-row items-center justify-between">
        <Text className="font-body-extrabold text-2xl text-primary-dark">
          Profile
        </Text>
        <TouchableOpacity className="items-center justify-center rounded-md border border-border bg-background p-2">
          <Lucide name="settings-2" size={24} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>

      {/* Profile card */}
      <View className="w-full flex-row items-center gap-5 rounded-md border border-border bg-background p-4 shadow-secondary">
        {/* Avatar */}
        <View className="h-20 w-20 rounded-full bg-primary"></View>
        {/* Name */}
        <View>
          <Text className="font-body-extrabold text-md">
            {profile?.first_name} {profile?.last_name}
          </Text>

          <Text className="font-body text-sm">{profile?.phone}</Text>

          <Text className="font-body text-sm">{session?.user?.email}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className="w-full rounded-md border border-border bg-background">
        {/* Items: My Addresses, Payment Methods, Favorites, Notification, Help & Support, Terms & Privacy, Logout */}
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            className="w-full flex-row items-center justify-between border-b border-border p-4"
          >
            <View className="flex-row items-center gap-3">
              <Lucide name={item.icon} size={24} color={colors.primary} />
              <Text className="font-body-semibold text-md">{item.label}</Text>
            </View>

            <Lucide name="chevron-right" size={24} color={colors.primary} />
          </TouchableOpacity>
        ))}
        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full flex-row items-center justify-between border-b border-border p-4"
        >
          <View className="flex-row items-center gap-3">
            <Lucide name="log-out" size={24} color={colors.danger} />
            <Text className="font-body-semibold text-md text-danger">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
