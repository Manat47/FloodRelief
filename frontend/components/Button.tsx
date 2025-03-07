import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps={
    text: string;
    onPress:()=>void;
}
export default function Button({ text , onPress}:ButtonProps) {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={{
        padding: 19,
        margin: 10,
        backgroundColor: '#7fffd4',
        borderRadius: 13,
    }}>
        <Text style={{
            textAlign: 'center'
        }}>{text}</Text>
    </TouchableOpacity>
  )
}