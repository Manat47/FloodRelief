import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function BeforeFloodScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      {/* กล่องข้อมูล */}
      <View style={styles.box}>
        <Text style={styles.title}>1. การตรวจสอบความเสี่ยง</Text>
        <Text style={styles.text}>
          • ศึกษาข้อมูลพื้นที่เสี่ยงน้ำท่วมจากหน่วยงานรัฐ{"\n"}
          • ตรวจสอบระดับน้ำในแม่น้ำหรือลคลองที่อยู่ใกล้บ้าน{"\n"}
          • เช็คสภาพอากาศและติดตามข่าวสารจากกรมอุตุนิยมวิทยา
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>2. การวางแผนรับมือ</Text>
        <Text style={styles.text}>
          • วางแผนเส้นทางอพยพสำหรับครอบครัว{"\n"}
          • เตรียมเอกสารสำคัญ เช่น บัตรประชาชน โฉนดบ้าน{"\n"}
          • จัดเก็บทรัพย์สินมีค่าเพื่อประเมินมูลค่าความเสียหายหากเกิดน้ำท่วม
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>3. การจัดเตรียมอุปกรณ์</Text>
        <Text style={styles.text}>
          • เตรียมอุปกรณ์ที่จำเป็น เช่น อาหารแห้ง, ไฟฉาย, ถ่าน, แบตเตอรี่สำรอง{"\n"}
          • สิ่งของใช้ส่วนตัวที่จำเป็น เช่น ยารักษาโรค, เสื้อผ้า{"\n"}
          • จัดเก็บอาหารสำคัญและเฟอร์นิเจอร์ไว้ที่สูง
        </Text>
      </View>
    </ScrollView>
  );
}

// 🌟 สไตล์ที่ปรับปรุงใหม่
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  box: {
    backgroundColor: "#A7ECFF", // สีฟ้าตามตัวอย่าง
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
