import React, { useState } from 'react';
import { StyleSheet,Text,TouchableOpacity,View,Image,Keyboard,TouchableWithoutFeedback,} from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  
  const dismissSearch = () => {
    Keyboard.dismiss(); 
    setIsSearchOpen(false); 
  };

  return (
    <TouchableWithoutFeedback onPress={dismissSearch}>
      <View style={styles.appBar}>
        {isSearchOpen ? (
          <Searchbar
            placeholder="ค้นหา..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
            autoFocus
            keyboardType="default"
        
            
          />
        ) : (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="ย้อนกลับ"titleStyle={{ fontSize: 18, fontWeight: "bold" }} />
            <Appbar.Action icon="magnify" onPress={() => setIsSearchOpen(true)} />
          </Appbar.Header>
        )}

        <View style={styles.container}>
          {/* หัวข้อ "คำขอของฉัน" */}
          <View style={styles.titleSection}>
            <Text style={styles.Title}>คำขอของฉัน</Text>
            <Image source={require("../../../assets/images/tableList.png")} style={styles.iconImage} />
          </View>

          {/* เมนูแท็บสถานะ */}
          <View style={styles.tabMenu}>
            <TouchableOpacity onPress={() => router.push('/meRequest/myRequest')}>
              <Text style={styles.tabItem}>กำลังดำเนินการ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/meRequest/finishRequest')}>
              <Text style={styles.tabItem}>สำเร็จ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/meRequest/cancleRequest')}>
              <Text style={[styles.tabItem, styles.activeTab]}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>

          {/* ส่วนกลาง (ไอคอนเอกสารใหญ่ + ข้อความ "ยังไม่มีคำร้องขอ") */}
          <View style={styles.emptyState}>
            <Image source={require("../../../assets/images/noTask.png")} style={styles.taskImage} />
            <Text style={styles.emptyText}>ยังไม่มีคำร้องขอ</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
  },
  searchbar: {
    margin: 10,
    textAlign:'left',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  Title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 5,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tabItem: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: 'blue',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    paddingBottom: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  taskImage: {
    width: 100,
    height: 100,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});
