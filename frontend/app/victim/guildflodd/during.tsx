import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function DuringFloodScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      {/* กล่องข้อมูล */}
      <View style={styles.box}>
        <Text style={styles.title}>1. การดูแลตัวเองและครอบครัว</Text>
        <Text style={styles.text}>
          • อยู่ในพื้นที่ปลอดภัย หลีกเลี่ยงพื้นที่น้ำลึกและน้ำไหลแรง{"\n"}
          • เตรียมอุปกรณ์ช่วยเหลือในน้ำใกล้ตัว เช่น โทรศัพท์มือถือพร้อมแบตเตอรี่{"\n"}
          • ห้ามใช้อุปกรณ์ไฟฟ้าในพื้นที่น้ำท่วม
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>2. การรับมือกับสถานการณ์</Text>
        <Text style={styles.text}>
          • ฟังคำเตือนและข่าวสารจากหน่วยงานที่เกี่ยวข้อง{"\n"}
          • หากต้องอพยพ ให้ปิดไฟและระบบแก๊สในบ้าน{"\n"}
          • ใช้เรือหรืออุปกรณ์ลอยตัวในการเดินทางผ่านน้ำ
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>3. การช่วยเหลือผู้อื่น</Text>
        <Text style={styles.text}>
          • ช่วยเหลือผู้ที่มีความเสี่ยงสูง เช่น เด็ก คนชรา และคนพิการ{"\n"}
          • แจ้งหน่วยงานช่วยเหลือหากมีเหตุฉุกเฉิน{"\n"}
          • หลีกเลี่ยงการเข้าใกล้ไฟฟ้าเพื่อป้องกันอาการถูกดูด
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
    backgroundColor: "#B2F2BB", // สีเขียวตามตัวอย่าง
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
