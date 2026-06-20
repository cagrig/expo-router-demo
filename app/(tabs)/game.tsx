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

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.resources}>
        <Text style={styles.resource}>🌾 42</Text>
        <Text style={styles.resource}>🪵 80</Text>
        <Text style={styles.resource}>⚒️ 15</Text>
        <Text style={styles.resource}>🪙 320</Text>
      </View>

      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Village Event</Text>
        <Text style={styles.eventText}>
          Scouts report strange lights near the abandoned fortress.
        </Text>
      </View>

      <FlatList
        data={buildings}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.building}>
            <Text style={styles.buildingIcon}>{item.icon}</Text>
            <Text style={styles.buildingName}>{item.name}</Text>
            <Text style={styles.level}>Lv {item.level}</Text>
            <Text style={styles.level}>200 gold</Text>
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

  resources: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  resource: {
    color: "#fff",
    fontWeight: "700",
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
