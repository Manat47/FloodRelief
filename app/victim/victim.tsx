import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FloodHelpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/flood_logo.png")} style={styles.logo} />
        <View>
          <Text style={styles.title}>FLOODHELP</Text>
          <Text style={styles.subtitle}>ช่วยเหลือผู้ประสบภัยน้ำท่วม</Text>
        </View>
      </View>

      {/* Section Placeholder สำหรับแผนที่ (ยังไม่เพิ่ม) */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>[แผนที่จะเพิ่มเร็วๆ นี้]</Text>
      </View>

      {/* ปุ่มต่างๆ */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/victim/floodcenter")}>
          <FontAwesome name="building" size={32} color="black" />
          <Text style={styles.cardTitle}>Flood Center</Text>
          <Text style={styles.cardDescription}>ตรวจสอบศูนย์ช่วยเหลือเพื่อติดต่อได้ง่ายขึ้น</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/victim/requesthelp")}>
          <FontAwesome name="plus-circle" size={32} color="black" />
          <Text style={styles.cardTitle}>Request Help</Text>
          <Text style={styles.cardDescription}>กรอกข้อมูลของคุณเพื่อให้ทีมช่วยเหลือดำเนินการ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/victim/guildflood")}>
          <FontAwesome name="question-circle" size={32} color="black" />
          <Text style={styles.cardTitle}>Guild FloodRelief</Text>
          <Text style={styles.cardDescription}>คำแนะนำสำหรับผู้ประสบภัยน้ำท่วม</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🌟 สไตล์ที่ปรับปรุงใหม่
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  placeholder: {
    height: 150,
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "gray",
  },
});
