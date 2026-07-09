import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GameProvider } from "@/GameContext";
import { useGameStore } from "@/GameStore";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { resources } = useGameStore();

  const unsubscribe = useGameStore.subscribe((state) => {
    const s = {
      resources: state.resources,
      buildings: state.buildings,
      military: state.military,
    };

    const j = JSON.stringify(s);

    console.log(typeof s, typeof j);
    return s;
  });

  useEffect(() => {
    async function readStorage() {
      const token = await AsyncStorage.getItem("gameState");

      try {
        JSON.parse(token ?? "{}");
      } catch (error) {}

      console.log("Stored token:", token);
    }

    async function writeStorage() {
      await AsyncStorage.setItem("gameState", "123Abc");
      console.log("Written");
    }

    readStorage();
    // writeStorage();
  }, []);

  return (
    <GameProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.resources}>
              <Text style={styles.resource}>🌾 {resources.food}</Text>
              <Text style={styles.resource}>🪵 {resources.wood}</Text>
              <Text style={styles.resource}>⚒️ {resources.stone}</Text>
              <Text style={styles.resource}>🪙 {resources.gold}</Text>
            </View>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ title: "Pencere" }} />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </View>
      </ThemeProvider>
      <Toast></Toast>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  resources: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#121212",
  },

  resource: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
