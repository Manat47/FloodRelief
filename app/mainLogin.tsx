import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; // ✅ เพิ่ม StyleSheet
import { useRouter } from "expo-router";

export default function mainLogin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌊 ยินดีต้อนรับสู่</Text>
      <Text style={styles.subtitle}>Flood Relief</Text>

      <Text style={styles.roleText}>เลือกบทบาทของคุณ:</Text>

      <TouchableOpacity onPress={() => router.push("/victim/login")} style={styles.button}>
        <Text>[ 🆘 ผู้ประสบภัย ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/organize/loginOrganize")} style={styles.button}>
        <Text>[ 🏢 องค์กรช่วยเหลือ ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")} style={styles.button}>
        <Text>[ 🚑 จิตอาสา ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")} style={styles.button}>
        <Text>แอดมิน</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ ใช้ StyleSheet.create() เพื่อสร้าง styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "blue",
  },
  roleText: {
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});
