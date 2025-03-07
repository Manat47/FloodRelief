import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function home() {
  return (
    <View style={styles.mainContainer}>
      {/* View ใหญ่แรก */}
      <View style={styles.wrapper}>
        <Text style={styles.outsideText}>Request Overview</Text>
        <View style={styles.container}>
          <Text style={styles.insideText}>Total Requests://รอดึงจำนวนrequestจากbackend</Text>
          <Text style={styles.insideText}>In Progress://รอดึงจำนวนrequestที่กำลังprogressจากbackend</Text>
          <Text style={styles.insideText}>Completed://รอดึงจำนวนrequestที่กำลังcompletedจากbackend</Text>
        </View>
      </View>

      {/* View ใหญ่ที่สอง */}
      <View style={styles.wrapper}>
        <Text style={styles.outsideText}>Request List</Text>
        <View style={styles.container}>
          <Text style={styles.insideText}>หมู่บ้าน A:
          -ต้องการน้ำดื่ม จำนวน //รอดึงจากbackend
          -สถานะช่วยเหลือ: //รอดึงสถานะจากtracking
          </Text>
          <Text style={styles.insideText}>
          หมู่บ้าน B:
          -ต้องการน้ำดื่ม จำนวน, อาหาร จำนวน //รอดึงจากbackend
          -สถานะช่วยเหลือ: //รอดึงสถานะจากtracking
          </Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.outsideText}>Manage Team</Text>
        <View style={styles.container}>
          <Text style={styles.insideText}>Team A:
            -สถานะ: กำลังดำเนินการในหมู่บ้าน...//รอดึงจากbackend
          </Text>
        </View>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 20,
    backgroundColor: 'green',
  },
  wrapper: {
    marginBottom: 20, // ระยะห่างระหว่างกล่อง
    //alignItems: 'center',
  },
  outsideText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  container: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  insideText: {
    fontSize: 18,
    color: '#333',
  },
});

