import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function home() {
  return (
    <View style={styles.mainContainer}>
      {/* View ใหญ่แรก */}
      <View style={styles.wrapper}>
        <Text style={styles.outsideText}>Request Overview</Text>
        <View style={styles.container}>
          <Text style={styles.insideText}>ข้อความในกล่อง 1</Text>
        </View>
      </View>

      {/* View ใหญ่ที่สอง */}
      <View style={styles.wrapper}>
        <Text style={styles.outsideText}>Request List</Text>
        <View style={styles.container}>
          <Text style={styles.insideText}>ข้อความในกล่อง 2</Text>
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

