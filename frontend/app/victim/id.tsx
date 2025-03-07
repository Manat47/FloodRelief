import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// Mock Data (สามารถเปลี่ยนเป็น API ได้)
const centers = [
  {
    id: "1",
    name: "เครือข่ายอาสาสมัครวิกฤตร่วมด้วยช่วยกัน",
    phone: "1677",
    status: "เปิดทำการ",
    time: "08:00 - 20:00 น.",
    address: "อาคารอินเตอร์ลิ้งค์ ทาวเวอร์ ถนนบางนา-ตราด เขตบางนา กรุงเทพฯ",
    image: "https://via.placeholder.com/200",
  },
  {
    id: "2",
    name: "ศูนย์อำนวยการจิตอาสาพระราชทาน ภาค 2",
    phone: "063-152-5212",
    status: "เปิดทำการ",
    time: "09:00 - 17:00 น.",
    address: "สำนักงานภาค 2 ถนนรามคำแหง กรุงเทพฯ",
    image: "https://via.placeholder.com/200",
  },
];

export default function FloodCenterDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ดึง ID จาก URL

  // ค้นหาศูนย์ที่ตรงกับ ID
  const center = centers.find((c) => c.id === id);

  if (!center) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>ไม่พบข้อมูลศูนย์ช่วยเหลือ</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>รายละเอียด</Text>
      </View>

      {/* โลโก้และข้อมูล */}
      <Image source={{ uri: center.image }} style={styles.centerImage} />
      <Text style={styles.centerTitle}>{center.name}</Text>
      <Text>📞 {center.phone}</Text>
      <Text>สถานะ: {center.status}</Text>
      <Text>เวลาทำการ: {center.time}</Text>
      <Text>ที่อยู่: {center.address}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", padding: 15 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: "green",
    },
    headerTitle: { fontSize: 18, fontWeight: "bold", color: "green", marginLeft: 10 },
    centerImage: { width: "100%", height: 200, resizeMode: "contain", marginVertical: 10 },
    centerTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
    infoText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
    notFound: { fontSize: 18, fontWeight: "bold", textAlign: "center", color: "red", marginTop: 20 },
  });
  