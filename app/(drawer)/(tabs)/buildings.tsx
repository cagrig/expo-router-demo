import { useGameStore } from "@/GameStore";
import { Buildings, BuildResult, Resources } from "@/types";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type BuildingConfig = {
  icon: string;
  title: string;
  cost: Partial<Resources>;
  key: keyof Buildings;
};

const resourceIcons: Record<keyof Resources, string> = {
  gold: "🪙",
  wood: "🪵",
  stone: "🪨",
  food: "🌾",
};

const buildingsConfig: BuildingConfig[] = [
  {
    icon: "🌾",
    title: "Farm",
    cost: {
      gold: 100,
      wood: 1000,
    },
    key: "farm",
  },
  {
    icon: "🪙",
    title: "Gold Mine",
    cost: {
      wood: 1000,
      stone: 5000,
    },
    key: "goldMine",
  },
  {
    icon: "🪵",
    title: "Lumber Mill",
    cost: {
      gold: 100,
      wood: 1000,
    },
    key: "lumberMill",
  },
  {
    icon: "🪨",
    title: "Quarry",
    cost: {
      gold: 100,
      wood: 1000,
      stone: 2000,
    },
    key: "quarry",
  },
  {
    icon: "🏹",
    title: "Barrack",
    cost: {
      gold: 1000,
      wood: 10000,
      stone: 5000,
    },
    key: "barracks",
  },
  {
    icon: "🏹",
    title: "Stable",
    cost: {
      gold: 5000,
      wood: 1000,
      stone: 5000,
    },
    key: "stable",
  },
  {
    icon: "⚒️",
    title: "Siege Workshop",
    cost: {
      gold: 5000,
      wood: 50000,
      stone: 20000,
    },
    key: "siege",
  },
];

export default function BuildingScreen() {
  const { buildings, build } = useGameStore();

  const doBuild = (type: keyof Buildings, cost: Partial<Resources>) => {
    const result = build(type, cost);
    if (result === BuildResult.ResourceError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Not enough resource",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Buildings</Text>
        <Text style={styles.eventText}>
          Construct and upgrade buildings to grow your settlement, gather resources, strengthen your
          economy, and prepare your forces for the challenges ahead.
        </Text>
      </View>

      <FlatList
        data={buildingsConfig}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.building} onPress={() => doBuild(item.key, item.cost)}>
            <Text style={styles.buildingIcon}>{item.icon}</Text>
            <Text style={styles.buildingName}>{item.title}</Text>
            <Text style={styles.level}>{buildings[item.key]}</Text>
            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>Cost</Text>{" "}
              {Object.entries(item.cost).map(([resource, amount]) => (
                <Text key={resource} style={styles.cost}>
                  {" "}
                  {resourceIcons[resource as keyof Resources]} {amount}{" "}
                </Text>
              ))}
            </View>
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

  costContainer: { marginTop: 10, alignItems: "center" },
  costLabel: { color: "#888", fontSize: 10, marginBottom: 3, textTransform: "uppercase" },
  cost: { color: "#ccc", fontSize: 11, lineHeight: 17 },
});
