import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const heroes = [
  {
    id: "1",
    name: "Aldric",
    class: "Knight",
    level: 12,
    hp: 145,
  },
  {
    id: "2",
    name: "Selene",
    class: "Mage",
    level: 10,
    hp: 90,
  },
  {
    id: "3",
    name: "Raven",
    class: "Ranger",
    level: 11,
    hp: 110,
  },
];

export default function HeroesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heroes</Text>

      <FlatList
        data={heroes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.className}>{item.class}</Text>

              <Text style={styles.stats}>
                Lv {item.level} • ❤️ {item.hp}
              </Text>
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

  title: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#121212",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  className: {
    color: "#999",
    marginTop: 2,
  },

  stats: {
    color: "#ddd",
    marginTop: 4,
  },
});
