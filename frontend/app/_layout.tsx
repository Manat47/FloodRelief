import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name='organize/(taps)' options={{
            //headerShown: false,
        }}/>
        <View>
            <Text>_layout</Text>
        </View>
    </Stack>
    
  )
}