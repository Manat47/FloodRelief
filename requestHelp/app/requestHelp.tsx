import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet,Image } from "react-native";
import { Checkbox,Appbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function RequestHelpScreen() {
  const router = useRouter();
  const [wantHelp, setWantHelp] = useState({
    food: false,
    transport: false,
    water: false,
    medicine: false,
  });
  const [medicineOptions, setMedicinOptions] = useState({
    firstaidkit: false,
    painkiller: false,
    antibiotics: false,
    bandages: false,
    other: false,

  });
  const [medicineDetails, setMedicineDetails] = useState({
    other: ""
  });
  const [peopleCount, setPeopleCount] = useState(1);
  const [details, setDetails] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();

  const pickMedia = async () => {
    if (!galleryPermission?.granted) {
      const { granted } = await requestGalleryPermission();
      if (!granted) {
        Alert.alert("การเข้าถึงถูกปฏิเสธ", "กรุณาให้สิทธิ์เข้าถึงแกลเลอรี่ในตั้งค่า");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestCameraPermission();
      if (!granted) {
        Alert.alert("การเข้าถึงถูกปฏิเสธ", "กรุณาให้สิทธิ์เข้าถึงกล้องในตั้งค่า");
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia(result.assets[0].uri);
    }
  };
  const openMediaOptions = () => {
    Alert.alert("เลือกแกลเลอรี่หรือถ่ายใหม่", "เลือกรูปภาพ/วิดีโอจากแกลเลอรี่หรือถ่ายรูปใหม่", [
      {
        text: "เลือกจากแกลเลอรี่",
        onPress: pickMedia,
      },
      {
        text: "ถ่ายรูปใหม่",
        onPress: takePhoto,
      },
      {
        text: "ยกเลิก",
        style: "cancel",
      },
    ]);
  }

  const togglewantHelp = (item: keyof typeof wantHelp) => {
    setWantHelp((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };
  const toggleMedicineOptions = (item: keyof typeof medicineOptions) => {
    setMedicinOptions((prev) =>({
      ...prev,
      [item]: !prev[item],
    }));

    if (item === "other" && !medicineOptions.other) {
      setMedicineDetails((prev) => ({ ...prev, other: "" }));
    }
  
  };
  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("wantHelp", JSON.stringify(wantHelp));
    formData.append("medicineOptions", JSON.stringify(medicineOptions));
    formData.append("medicineDetails", JSON.stringify(medicineDetails));
    formData.append("peopleCount", peopleCount.toString());
    formData.append("details", details);
     /* wantHelp,
      medicineOptions,
      medicineDetails,
      peopleCount,
      details,
      selectedMedia,*/
    if (selectedMedia) {
      const uri = selectedMedia;
      const fileExtension = uri.split(".").pop();
      const filename = `file-${Date.now()}.${fileExtension}`;
      
      try {
    
        const response = await fetch(uri);
        const blob = await response.blob();
  
      
        const file = new File([blob], filename, { type: blob.type });
  
        
        formData.append("file", file); 
      } catch (error) {
        console.error("ไม่สามารถดาวน์โหลดไฟล์ได้:", error);
      }
    }
  
    
  
    try {
      const response = await fetch('http://10.0.2.2:5000/api/requests', {
        method: 'POST',
        body: formData, 
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert('สำเร็จ', 'ส่งคำขอเรียบร้อยแล้ว');
        router.push('/confirmation');
      } else {
        Alert.alert('ข้อผิดพลาด', data.message);
      }
    } catch (error) { 
      console.error(error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์xca');
    }
  };


  return (
    <View style={styles.appBar}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()}/>
          </Appbar.Header>

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>REQUEST HELP</Text>

      
      <Text style={styles.sectionTitle}>ที่อยู่/ติดต่อ</Text>
      <View style={styles.locationContainer}>
        <FontAwesome name="map-marker" size={40} color="black" />
        <Text style={styles.locationText}>xxxx xxxx xxxx</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>edit</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.sectionTitle}>ประเภทความช่วยเหลือ</Text>
      {Object.entries(wantHelp).map(([key, value]) => (
        <View key={key} style={styles.checkboxContainer}>
          <Checkbox status={value ? "checked" : "unchecked"} onPress={() => togglewantHelp(key as keyof typeof wantHelp)} />
          <Text style={styles.checkboxLabel}>
            {key === "food" ? "อาหาร" : key === "transport" ? "ขนย้าย"  : key === "water" ? "น้ำดื่ม" :key === "medicine" ? "ยาสามัญ" :""}
          </Text>
        </View>
      ))}
      {wantHelp.medicine && (
        <View style={styles.subCheckboxContainer}>
          <Text style={styles.subTitle}>เลือกประเภทของยา:</Text>
          {Object.entries(medicineOptions).map(([key, value]) => (
            <View key={key} style={styles.checkboxContainer}>
              <Checkbox status={value ? "checked" : "unchecked"} onPress={() => toggleMedicineOptions(key as keyof typeof medicineOptions)} />
              <Text style={styles.checkboxLabel}>
                {key === "firstaidkit" ? "ชุดปฐมพยาบาล":key === "painkiller" ? "ยาแก้ปวด" : key === "antibiotics" ? "ยาปฏิชีวนะ" : key ==="bandages"?"ผ้าพันแผล":key ==="other" ? "อื่นๆ":""}
              </Text>
              </View>
          ))}
          {medicineOptions.other && (
            <TextInput
              style={styles.input}
              placeholder="ระบุรายละเอียดยาอื่นๆ"
              value={medicineDetails.other}
              onChangeText={(text) =>
                setMedicineDetails((prev) => ({ ...prev, other: text }))
              }
            />
          )}
        </View>
      )}

      
      <View style={styles.peopleTitle}>
      <Text style={styles.peopleTitle}>จำนวนผู้ต้องการความช่วยเหลือ</Text>
      </View>
      <View style={styles.counterContainer}>
      
        <TouchableOpacity onPress={() => setPeopleCount(Math.max(1, peopleCount - 1))} style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.peopleCount}>{peopleCount}</Text>
        <TouchableOpacity onPress={() => setPeopleCount(peopleCount + 1)} style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>รายละเอียดเพิ่มเติม</Text>
      <TextInput
        style={styles.input}
        placeholder="ระบุข้อมูลที่ช่วยให้จิตอาสาเข้าใจสถานการณ์ได้ดีขึ้น"
        keyboardType="default"
        multiline
        value={details}
        onChangeText={setDetails}
        
      />

      <TouchableOpacity style={styles.uploadButton} onPress={openMediaOptions}>
        <FontAwesome name="camera" size={20} color="black" />
        <Text style={styles.uploadButtonText}>เลือกรูปภาพหรือวิดีโอ</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
          <FontAwesome name="camera" size={20} color="black" />
          <Text style={styles.uploadButtonText}>ถ่ายรูป</Text>
      </TouchableOpacity> */}


     
      {selectedMedia && <Image source={{ uri: selectedMedia }} style={styles.mediaPreview} />}

   
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>ยืนยัน</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar:{
    flex:1
  },
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    
    
  },
  peopleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  locationText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    marginLeft: 15,
  },
  editText: {
    color: "green",
    fontSize: 16,
    fontWeight: "500",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
  
  
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: "green", 
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 75,
    marginRight: 75
  },
  counterText: {
    color: "green", 
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  peopleCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 80,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
    textAlignVertical: "bottom",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  subCheckboxContainer: {
    marginLeft: 30,
    marginBottom: 10,
  },
  textInputContainer: {
    marginLeft: 40, 
    marginTop: 5,
    width: "80%",
  },
  uploadButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#ddd", padding: 10, borderRadius: 5, justifyContent: "center", marginBottom: 15 },
  uploadButtonText: { fontSize: 16, marginLeft: 10 },
  mediaPreview: { width: 150, height: 150, borderRadius: 10, marginTop: 10, alignSelf: "center" },
  
});
/*จากนั้นใน requestHelp.tsx ที่เป็น React Native คุณสามารถใช้ URL นี้ในการแสดงรูปหรือวิดีโอที่อัพโหลดไปได้
typescript
คัดลอก
แก้ไข
const fileUrl = `http://10.0.2.2:5000/api/requests/file/${fileName}`; // เชื่อมโยงกับ API ที่คุณเพิ่มไว้

// การแสดงไฟล์
<Image source={{ uri: fileUrl }} style={{ width: 100, height: 100 }} />
ตัวอย่างนี้จะแสดงไฟล์จาก GridFS โดยที่ fileName คือชื่อไฟล์ที่คุณได้จากการอัพโหลด ซึ่งจะต้องส่งไปใน URL เพื่อดึงไฟล์นั้นๆ มาผ่าน API ที่คุณสร้างไว้ใน backend. */