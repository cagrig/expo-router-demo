import { useGame } from "@/GameContext";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const buildings = [
  { id: "1", icon: "🌾", name: "Farm", level: 3 },
  { id: "2", icon: "⚒️", name: "Forge", level: 2 },
  { id: "3", icon: "🏰", name: "Town Hall", level: 1 },
  { id: "4", icon: "🏹", name: "Barracks", level: 4 },
  { id: "5", icon: "📚", name: "Library", level: 2 },
  { id: "6", icon: "🧙", name: "Mage Tower", level: 1 },
  { id: "7", icon: "🧙", name: "Mage Tower1", level: 1 },
  { id: "8", icon: "🧙", name: "Mage Tower2", level: 1 },
];

interface Resources {
  gold: number;
  stone: number;
  wood: number;
  food: number;
}

type ResourceConfig = {
  icon: string;
  title: string;
  increment: number;
  key: keyof Resources;
};

const resourcesConfig: ResourceConfig[] = [
  {
    icon: "🪙",
    title: "Gold",
    increment: 500,
    key: "gold",
  },
  {
    icon: "⚒️",
    title: "Stone",
    increment: 400,
    key: "stone",
  },
  {
    icon: "🪵",
    title: "Wood",
    increment: 1000,
    key: "wood",
  },
  {
    icon: "🌾",
    title: "Food",
    increment: 5000,
    key: "food",
  },
];

export default function ResourcesScreen() {
  const [resources, setResources] = useState<Resources>({
    gold: 5000,
    stone: 6000,
    wood: 7000,
    food: 1000,
  });

  const setResourceValue = (key: keyof Resources, value: number) => {
    setResources((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { gameState, setGameState } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Village Event</Text>
        <Text style={styles.eventText}>
          {gameState.score}
          {/* Scouts report strange lights near the abandoned fortress. */}
        </Text>
      </View>

      <FlatList
        data={resourcesConfig}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.building}
            onPress={() => setResourceValue(item.key, resources[item.key] + item.increment)}
          >
            <Text style={styles.buildingIcon}>{item.icon}</Text>
            <Text style={styles.buildingName}>{item.title}</Text>
            <Text style={styles.level}>{resources[item.key]}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },

  eventCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  eventTitle: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  eventText: {
    color: "#ddd",
  },

  building: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
  },

  buildingIcon: {
    fontSize: 28,
  },

  buildingName: {
    color: "#fff",
    marginTop: 6,
    fontSize: 12,
  },

  level: {
    color: "#D4AF37",
    marginTop: 4,
    fontSize: 11,
  },
});
