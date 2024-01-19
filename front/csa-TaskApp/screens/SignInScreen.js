import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { URL } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const SignInScreen = function ({ navigation }) {
    
    const [data, setData] = useState({
        email: '',
        password: ''
     })


    const handleSignIn = () => {
        
        if(data.email.length === 0 && data.password.length === 0) {
                Alert.alert('Missing field', 'You have some missing fields to fill', [
                    {text: 'Okay'}
                ])
            }
        // Handle Sign up here
        // console.log('Task created:', { firstName, lastName });

        axios.post(`${URL}/login`, {
            email: data.email,
            password: data.password
        }, {
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            console.log(response.data)

            const jsonValue = JSON.stringify(response.data)

            AsyncStorage.setItem('userData', jsonValue)
            navigation.navigate('MainTabs')


        }).catch((err) => {
            console.log(err.response)
        })
    };


    return (
        // <KeyboardAvoidingView behavior='padding'
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
        //     style={styles.container}
        // >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
                SafeAreaView showsVerticalScrollIndicator={false}
                style={{ ...styles.container, paddingHorizontal: 35, }} // paddingTop: 130,
            >
                <Text style={styles.signInText}>Sign In</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={data.email}
                        onChangeText={(val) => setData({...data, email: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={data.password}
                        onChangeText={(val) => setData({...data, password: val})}
                    />

                    <TouchableOpacity style={styles.addButton}
                        onPress={handleSignIn}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.option}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.optionText}>Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('UpdatePasword')}
                    >
                        <Text style={styles.optionText}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#094FAF', // Background color
        // padding: 10,  // All sides are 10
        // paddingHorizontal: 50,  // Left and right are 20
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"

    },
    form: {
        justifyContent: "space-between",
        alignContent: "center"
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white', // Input border color
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        color: '#eee'
    },

    option: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    optionText: {
        color: '#fff',
    },

    addButton: {
        backgroundColor: '#fff',
        padding: 13,  // All sides are 10
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonText: {
        color: '#094FAF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        borderRadius: 10, // Set the border radius
        borderWidth: 2, // Set the border width
        borderColor: '#3498db', // Set the border color to blue
        padding: 10, // Add some padding for better visual appearance
    },
});

export default SignInScreen;

