import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function FloodCenterScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  // Mock Data สำหรับศูนย์ช่วยเหลือ
  const centers = [
    {
      id: 1,
      name: "เครือข่ายอาสาสมัครวิกฤตร่วมด้วยช่วยกัน",
      phone: "1677",
      status: "เปิดทำการ",
      time: "08:00 - 20:00 น.",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "ศูนย์อำนวยการจิตอาสาพระราชทาน ภาค 2",
      phone: "063-152-5212",
      status: "เปิดทำการ",
      time: "09:00 - 17:00 น.",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "ศูนย์ช่วยเหลืออาสาสมัครหมู่บ้านน้ำใส",
      phone: "034-567-8901",
      status: "ปิดทำการชั่วคราว",
      time: "-",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "ศูนย์ช่วยเหลือโรงเรียนวัดเก็บประชาธรรศ",
      phone: "02-890-2345",
      status: "เปิดทำการ",
      time: "07:00 - 19:00 น.",
      image: "https://via.placeholder.com/100",
    },
  ];

  // ฟังก์ชันกรองข้อมูลศูนย์ช่วยเหลือตามคำค้นหา
  const filteredCenters = centers.filter((center) =>
    center.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ศูนย์ช่วยเหลือน้ำท่วม</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ช่องค้นหา */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาศูนย์ช่วยเหลือ"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* รายการศูนย์ช่วยเหลือ */}
      <ScrollView style={styles.centerList}>
        {filteredCenters.map((center) => (
          <TouchableOpacity
            key={center.id}
            style={styles.centerCard}
            onPress={() => router.push('/')} //`/${center.id}`
          >
            <Image source={{ uri: center.image }} style={styles.centerImage} />
            <View style={styles.centerInfo}>
              <Text style={styles.centerName}>{center.name}</Text>
              <Text style={styles.centerText}>เบอร์โทรศัพท์: {center.phone}</Text>
              <Text style={styles.centerText}>สถานะ: {center.status}</Text>
              <Text style={styles.centerText}>เวลาทำการ: {center.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// 🌟 สไตล์ของหน้านี้
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  centerList: {
    marginTop: 10,
  },
  centerCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  centerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  centerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  centerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerText: {
    fontSize: 14,
    color: "#555",
  },
});
//git remote add friend_repo https://github.com/Manat47/FloodRelief.git
