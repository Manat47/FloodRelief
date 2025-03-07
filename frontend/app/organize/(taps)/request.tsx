import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

export default function RequestScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  // ดึงข้อมูลจาก API
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/requests"); // ถ้าใช้ Emulator Android ให้ใช้ 10.0.2.2
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      Alert.alert("Error", "ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  // รับเรื่องคำขอ (Assign ทีม)
  const handleAssign = async (requestId: string) => {
    try {
      const response = await axios.post("http://localhost:5000/teams/assign", {
        organization_id: "65e6b2d3f2c9a800d4c8e7b2", // ใส่ organization_id จริง
        request_id: requestId,
        team_id: "65e7b6a9a4d8e900c2f3b9d1", // ใส่ team_id จริง
      });

      if (response.data.status === "assigned") {
        Alert.alert("สำเร็จ", "รับเรื่องคำขอเรียบร้อยแล้ว!");
        fetchRequests(); // รีเฟรชข้อมูล
      }
    } catch (error) {
      console.error("Error assigning request:", error);
      Alert.alert("Error", "ไม่สามารถรับเรื่องคำขอได้");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>คำขอช่วยเหลือ</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ padding: 15, backgroundColor: "#f0f0f0", marginBottom: 10, borderRadius: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.location}</Text>
              <Text>📌 {item.description}</Text>
              <Text>Status: {item.status}</Text>
              <Button title="รับเรื่อง" onPress={() => handleAssign(item._id)} disabled={item.status !== "pending"} />
            </View>
          )}
        />
      )}
    </View>
  );
}
