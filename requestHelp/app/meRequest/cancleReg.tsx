import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Card, Dropdown } from 'react-native-paper';

const CancelRequestScreen: React.FC = () => {
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>การยกเลิกคำขอ</Text>
      <Dropdown
        label="หมายเหตุ"
        data={[{ label: 'เหตุผลที่ 1', value: '1' }, { label: 'เหตุผลที่ 2', value: '2' }]}
        onChangeText={(value) => setReason(value)}
        style={styles.dropdown}
      />
      <TextInput
        style={styles.textArea}
        placeholder="เหตุผลการยกเลิกที่ระบุเอง"
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.input}
        placeholder="ข้อเสนอแนะเพิ่มเติม"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />
      <Button mode="contained" style={styles.button} onPress={() => console.log('Confirmed')}>
        ยืนยัน
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  dropdown: {
    width: '100%',
    marginBottom: 15,
  },
  textArea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#B71C1C',
    width: '100%',
    paddingVertical: 10,
  },
});

export default CancelRequestScreen;
