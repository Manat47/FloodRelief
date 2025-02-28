import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function App () {
    const router = useRouter();
    return (
        <View>
            <Image source={require('./../assets/images/landing.jpg')}
                style={{
                    width: '100%',
                    height: 350
                }}
            />
            <View style={{
                padding: 20,
                backgroundColor: 'white'
            }}>
                <Text style={{
                    fontSize: 33,
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>Welcome to FLOOD HELP</Text>
                <Text style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 10,
                    color: 'gray'
                }}>When disaster strikes, every second counts.
                NamJai helps you find support with just a tap.</Text>
            </View>
            
            <Button text = 'Get Started' 
            onPress={()=> router.push('/mainLogin')}/>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%' ,
    },
    topInfo: {
        height: 150,
        backgroundColor: 'pink',
        flexDirection: 'row'
    },
    imageColumn: {
        height : '100%',
        width: '35%',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        height: '100%',
        width: '65%',
        backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    pic: {
        height: 100,
        width:100,
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    username: {
        fontSize: 15,
        fontWeight: '400',
    },
    bio: {
        fontSize: 12,
        fontWeight: '300',
    }
});