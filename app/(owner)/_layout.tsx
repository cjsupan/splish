import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Colors } from "@/constants/design/theme";

function TabIcon({
  emoji,
  label,
  focused,
}: {
  emoji: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View className='items-center gap-0.5 pt-1'>
      <Text className='text-xl'>{emoji}</Text>
      <Text
        className={`text-[10px] font-medium ${focused ? "text-primary-500" : "text-ink-disabled"}`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function OwnerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border.DEFAULT,
          height: 72,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.ink.disabled,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji='📊' label='Dashboard' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji='📋' label='Orders' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='shop'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji='🏪' label='My Shop' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji='👤' label='Profile' focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
