import { useGameStore } from "@/GameStore";
import { i18n } from "@/i18n";
import { Resources } from "@/types";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    icon: "🪨",
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

export default function GameScreen() {
  const { resources, addResource, cityName } = useGameStore();

  return (
    <View style={styles.container}>
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{i18n.t("welcome", { name: cityName })}</Text>
        <Text style={styles.eventText}>
          A shadow stirs in the forgotten lands. Strange lights haunt the abandoned fortress, and
          only the brave dare uncover the truth.
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Resources</Text>
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
              onPress={() => addResource(item.key, item.increment)}
            >
              <Text style={styles.buildingIcon}>{item.icon}</Text>
              <Text style={styles.buildingName}>{item.title}</Text>
              <Text style={styles.level}>{resources[item.key]}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
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
