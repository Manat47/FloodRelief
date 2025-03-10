import { Tabs,} from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'หน้าแรก',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        
      />
      
      <Tabs.Screen
        name="meRequest"
        options={{
          title: 'คำขอของฉัน',
          tabBarIcon: ({color}) => (
            <Image
              source={require("../../assets/images/request.png")}
              style={{ width: 28,height:28,tintColor: color}}
              />
          ),
        }}
        />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'แจ้งเตือน',
          tabBarIcon: ({color}) => (
            <Image
              source={require("../../assets/images/notification.png")}
              style={{ width: 28,height:28,tintColor: color}}
              />
          ),
        }}
        />  
        <Tabs.Screen name="requestHelp" options={{ href: null }} />
        <Tabs.Screen name="screens/tea" options={{ href: null }} />
        {/* <Tabs.Screen name="meRequest/finishRequest" options={{ href: null }} />
        <Tabs.Screen name="meRequest/cancleRequest" options={{ href: null }} /> */}
      

          
  
          <Tabs.Screen
        name="myAccount"
        options={{
          title: 'ฉัน',
          tabBarIcon: ({color}) => (
            <Image
              source={require("../../assets/images/me.png")}
              style={{ width: 28,height:28,tintColor: color}}
              />
          ),
        }}
        />  
    </Tabs>
  );
}
