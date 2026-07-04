import { useGameStore } from "@/GameStore";
import { Military, Resources } from "@/types";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MilitaryConfig = {
  icon: string;
  title: string;
  cost: Partial<Resources>;
  key: keyof Military;
};

const buildingsConfig: MilitaryConfig[] = [
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
    icon: "⚒️",
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
    key: "barrack",
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

export default function MilitaryScreen() {
  const { buildings, build } = useGameStore();

  return (
    <View style={styles.container}>
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Buildings Event</Text>
        <Text style={styles.eventText}>
          Scouts report strange lights near the abandoned fortress.
        </Text>
      </View>

      <FlatList
        data={buildingsConfig}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.building} onPress={() => build(item.key, item.cost)}>
            <Text style={styles.buildingIcon}>{item.icon}</Text>
            <Text style={styles.buildingName}>{item.title}</Text>
            <Text style={styles.level}>{buildings[item.key]}</Text>
            {/* <Text style={styles.level}>200 gold</Text> */}
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
