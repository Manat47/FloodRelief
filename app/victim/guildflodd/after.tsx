import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function AfterFloodScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      {/* กล่องข้อมูล */}
      <View style={styles.box}>
        <Text style={styles.title}>1. การตรวจสอบความปลอดภัย</Text>
        <Text style={styles.text}>
          • ตรวจสอบระบบไฟฟ้าและแก๊สก่อนใช้งาน{"\n"}
          • เช็คโครงสร้างบ้าน เช่น ผนัง พื้น และหลังคา{"\n"}
          • หลีกเลี่ยงการเดินในพื้นที่ที่ยังมีน้ำขัง
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>2. การทำความสะอาด</Text>
        <Text style={styles.text}>
          • ใช้น้ำยาฆ่าเชื้อในการล้างทำความสะอาดพื้นที่{"\n"}
          • ทิ้งอาหารและสิ่งของที่เน่าเปื่อย{"\n"}
          • เปิดประตูและหน้าต่างเพื่อระบายอากาศ
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>3. การป้องกันโรค</Text>
        <Text style={styles.text}>
          • ล้างมือบ่อยๆ และสุขอนามัยต้องสะอาด{"\n"}
          • ป้องกันโรคที่มากับน้ำโดยฉีดพ่นยาฆ่าเชื้อ{"\n"}
          • ดื่มน้ำสะอาดเพื่อป้องกันไม่ให้ติดเชื้อ
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>4. การขอความช่วยเหลือ</Text>
        <Text style={styles.text}>
          • แจ้งหน่วยงานรัฐหรือองค์กรที่ให้ความช่วยเหลือ{"\n"}
          • รับการฟื้นฟูจากหน่วยงานที่เกี่ยวข้อง{"\n"}
          • ขอรับสิทธิประโยชน์ เช่น เงินเยียวยา หรือวัสดุอุปกรณ์ช่วยเหลือ
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
    backgroundColor: "#FFD966", // สีเหลืองตามตัวอย่าง
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
