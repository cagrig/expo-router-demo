import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Item = {
  id: string;
  icon: string;
  name: string;
  amount: number;
  rarity: "common" | "rare" | "epic";
};

const items: Item[] = [
  {
    id: "1",
    icon: "🗡️",
    name: "Iron Sword",
    amount: 1,
    rarity: "common",
  },
  {
    id: "2",
    icon: "🛡️",
    name: "Knight Shield",
    amount: 1,
    rarity: "rare",
  },
  {
    id: "3",
    icon: "🧪",
    name: "Health Potion",
    amount: 12,
    rarity: "common",
  },
  {
    id: "4",
    icon: "📜",
    name: "Ancient Scroll",
    amount: 2,
    rarity: "epic",
  },
  {
    id: "5",
    icon: "💎",
    name: "Crystal",
    amount: 8,
    rarity: "rare",
  },
  {
    id: "6",
    icon: "🏹",
    name: "Hunter Bow",
    amount: 1,
    rarity: "rare",
  },
];

const rarityColor = {
  common: "#666",
  rare: "#3B82F6",
  epic: "#A855F7",
};

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>

      <Text style={styles.capacity}>25 / 100 Slots Used</Text>

      <FlatList
        data={items}
        numColumns={4}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemCard,
              {
                borderColor: rarityColor[item.rarity],
              },
            ]}
          >
            <Text style={styles.icon}>{item.icon}</Text>

            {item.amount > 1 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.amount}</Text>
              </View>
            )}

            <Text numberOfLines={1} style={styles.itemName}>
              {item.name}
            </Text>
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

  title: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "700",
  },

  capacity: {
    color: "#999",
    marginTop: 4,
    marginBottom: 20,
  },

  row: {
    gap: 10,
  },

  itemCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#252525",
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 6,
  },

  icon: {
    fontSize: 28,
  },

  itemName: {
    color: "#FFF",
    fontSize: 10,
    textAlign: "center",
    marginTop: 6,
  },

  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#D4AF37",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#121212",
  },
});
