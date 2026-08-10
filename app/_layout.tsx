import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GameProvider } from "@/GameContext";
import { useGameStore } from "@/GameStore";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/stateSubscribe";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { login } from "@/auth";
import { getUserDataOrDefault, loadGame, updateUserData } from "@/storage";
import { GPSLocation } from "@/types";
import { getLocation } from "@/utils";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { resources, setGame, setCityName, setLocation } = useGameStore();

  useEffect(() => {
    async function loginAndLoadGame() {
      if (await login()) {
        const game = await loadGame();
        setGame(game);

        const locationResult = await getLocation();
        const location: GPSLocation = {
          latitude: 0,
          longitude: 0,
        };

        if (locationResult) {
          location.latitude = locationResult.latitude;
          location.longitude = locationResult.longitude;
        }

        const userData = await getUserDataOrDefault();

        await updateUserData(userData.id, { location });
        setCityName(userData.cityName);
        setLocation(location);
      }
    }

    loginAndLoadGame();
  }, [setGame, setCityName, setLocation]);

  return (
    <GameProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.resources}>
              <Text style={styles.resource}>🌾 {resources.food}</Text>
              <Text style={styles.resource}>🪵 {resources.wood}</Text>
              <Text style={styles.resource}>🪨 {resources.stone}</Text>
              <Text style={styles.resource}>🪙 {resources.gold}</Text>
            </View>
            <Stack>
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

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
