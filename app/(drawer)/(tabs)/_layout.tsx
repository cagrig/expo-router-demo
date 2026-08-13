// app/(tabs)/_layout.tsx

import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333",
        },
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#777",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kingdom",
          tabBarIcon: ({ color }) => <FontAwesome6 name="fort-awesome" size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="buildings"
        options={{
          title: "Buildings",
          tabBarIcon: ({ color }) => <FontAwesome6 name="building" size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="military"
        options={{
          title: "Military",
          tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="users"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => <FontAwesome6 name="sun-plant-wilt" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
