import { useGameStore } from "@/GameStore";
import { Buildings, Military, ProduceResult, Resources } from "@/types";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type MilitaryConfig = {
  icon: string;
  title: string;
  cost: Partial<Resources>;
  key: keyof Military;
  building: keyof Buildings;
};

const militaryConfig: MilitaryConfig[] = [
  {
    icon: "🗡",
    title: "Swordsman",
    cost: {
      gold: 10,
      wood: 10,
      food: 10,
    },
    key: "swordsman",
    building: "barracks",
  },
  {
    icon: "🏹",
    title: "Archer",
    cost: {
      gold: 100,
      wood: 100,
      food: 250,
    },
    key: "archer",
    building: "barracks",
  },
  {
    icon: "🏇",
    title: "Cavalry",
    cost: {
      gold: 100,
      wood: 100,
      food: 250,
    },
    key: "cavalry",
    building: "stable",
  },
  {
    icon: "🎱",
    title: "Catapult",
    cost: {
      gold: 1000,
      wood: 5000,
      stone: 2000,
    },
    key: "catapult",
    building: "siege",
  },
];

export default function MilitaryScreen() {
  const { military, produce } = useGameStore();

  const produceUnit = (
    type: keyof Military,
    cost: Partial<Resources>,
    building: keyof Buildings,
  ) => {
    const result = produce(type, cost, building);

    if (result === ProduceResult.BuildingError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Not enough building",
      });
    }

    if (result === ProduceResult.ResourceError) {
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
        <Text style={styles.eventTitle}>Military</Text>
        <Text style={styles.eventText}>
          Recruit and command troops to defend your territory, conquer new lands, and build a
          powerful army ready for battle.
        </Text>
      </View>

      <FlatList
        data={militaryConfig}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.building}
            onPress={() => produceUnit(item.key, item.cost, item.building)}
          >
            <Text style={styles.buildingIcon}>{item.icon}</Text>
            <Text style={styles.buildingName}>{item.title}</Text>
            <Text style={styles.level}>{military[item.key]}</Text>
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
