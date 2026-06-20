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
        name="game"
        options={{
          title: "Kingdom",
          tabBarIcon: ({ color }) => <FontAwesome6 name="fort-awesome" size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <FontAwesome6 name="bag-shopping" size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="heroes"
        options={{
          title: "Heroes",
          tabBarIcon: ({ color }) => <FontAwesome6 name="shield-halved" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
