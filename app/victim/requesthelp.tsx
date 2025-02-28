import React, { useState } from "react";
  import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
  
  import { Checkbox } from "react-native-paper";
  import { FontAwesome } from "@expo/vector-icons";
  import { useRouter } from "expo-router";

  export default function RequestHelpScreen() {
    const router = useRouter();
    const [checkedItems, setCheckedItems] = useState({
      food: false,
      transport: false,
      medicine: false,
      water: false,
    });
    const [peopleCount, setPeopleCount] = useState(1);
    const [details, setDetails] = useState("");

    const toggleCheckbox = (item) => {
      setCheckedItems((prev) => ({
        ...prev,
        [item]: !prev[item],
      }));
    };

    return (
      <ScrollView style={{ padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>REQUEST HELP</Text>
        <Text style={{fontSize:15,flexDirection:"row",fontWeight:"bold", marginBottom: 15}}>ที่อยู่/ติดต่อ</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
          <FontAwesome name="map-marker" size={40} color="black" />
          <Text style={{ marginLeft: 30,fontWeight: "bold",fontSize:15 }}>xxxx xxxx xxxx</Text>
          <TouchableOpacity>
            <Text style={{ color: "green", marginLeft: 180 }}>edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 25 }}>ประเภทความช่วยเหลือ</Text>
        {Object.entries(checkedItems).map(([key, value]) => (
          <View key={key} style={{ flexDirection: "row", alignItems: "center",marginBottom: 15 }}>
            <Checkbox status={value ? "checked" : "unchecked"} onPress={() => toggleCheckbox(key)} />
            <Text>{key === "food" ? "อาหาร" : key === "transport" ? "ขนย้าย" : key === "medicine" ? "ยาสามัญ" : "น้ำดื่ม"}</Text>
          </View>
        ))}

        <Text style={{ marginTop: 30 }}>จำนวนผู้ต้องการความช่วยเหลือ</Text>
        
        <View style={{flexDirection:"row"}}><TouchableOpacity onPress={() => setPeopleCount(peopleCount - 1)}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 25 }}>- </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 25 }}> {peopleCount}</Text>
        <TouchableOpacity onPress={() => setPeopleCount(peopleCount + 1)}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 25 }}>+</Text>
        </TouchableOpacity>
      
        </View>

        <Text style={{ marginTop: 40 }}>รายละเอียดเพิ่มเติม</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginTop: 10, borderRadius: 5 }}
          placeholder="ระบุข้อมูลที่ช่วยให้จิตอาสาเข้าใจสถานการณ์ได้ดีขึ้น"
          multiline
          value={details}
          onChangeText={setDetails}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginTop: 10, borderRadius: 5 }}
          placeholder="อัพโหลดภาพหรือวิดีโอ(ทางเลือก)"
          multiline
          value={details}
          onChangeText={setDetails}
        />

        <TouchableOpacity style={{ backgroundColor: "green", padding: 15, borderRadius: 5, marginTop: 25, alignItems: "center" }} onPress={() => router.push("/") }>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>ยืนยัน</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
