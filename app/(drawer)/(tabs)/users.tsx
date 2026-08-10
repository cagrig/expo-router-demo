import { getUsers } from "@/storage";
import { UserInfo } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UsersScreen() {
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    async function getGameUsers() {
      const gameUsers = await getUsers();
      console.log(gameUsers);
      setUsers(gameUsers);
    }

    getGameUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Kingdoms</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.cityName.charAt(0).toUpperCase()}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.cityName}</Text>

              {/* <Text style={styles.className}>{item.class}</Text> */}

              <Text style={styles.stats}>{/* Lv {item.level} • ❤️ {item.hp} */}</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>View</Text>
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
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 18,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#121212",
  },

  info: {
    flex: 1,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  className: {
    color: "#999",
    fontSize: 14,
    marginTop: 3,
  },

  stats: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 5,
  },

  badge: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    color: "#121212",
    fontWeight: "700",
    fontSize: 12,
  },
});
