import { getUserId } from "@/auth";
import { db } from "@/firebaseConfig";
import { useGameStore } from "@/GameStore";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SettingsScreen() {
  const cityName = useGameStore((s) => s.cityName);
  const setCityName = useGameStore((s) => s.setCityName);

  const [name, setName] = useState(cityName);

  const handleSubmit = async () => {
    const userId = getUserId();
    try {
      const cityName = name.trim();
      await updateDoc(doc(db, "users", userId), {
        cityName: cityName,
      });

      setCityName(cityName);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "City name is updated",
      });
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "City name could not be updated",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 20 }}>Change city name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter city"
        placeholderTextColor={"#fff"}
        style={styles.input}
      />

      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    backgroundColor: "#1c1c1e",
    borderColor: "#3a3a3c",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
