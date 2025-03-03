import React from "react";
import { View, Text, TouchableOpacity} from "react-native"; 
import { useRouter } from "expo-router";
import styles from "../src/styles/screenstyle";


export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌊 ยินดีต้อนรับสู่</Text>
      <Text style={styles.subtitle}>Flood Relief</Text>

      <Text style={styles.roleText}>เลือกบทบาทของคุณ:</Text>

      <TouchableOpacity onPress={() => router.push("/login/victim")} style={styles.button}>
        <Text>[ 🆘 ผู้ประสบภัย ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login/volunteer")} style={styles.button}>
        <Text>[ 🚑 จิตอาสา  ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login/organize")} style={styles.button}>
        <Text>[ 🏢 องค์กรช่วยเหลือ ]</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login/admin")} style={styles.button}>
        <Text>แอดมิน</Text>
      </TouchableOpacity>
    </View>
  );
}



