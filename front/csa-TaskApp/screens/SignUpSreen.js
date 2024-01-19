import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import { URL } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpScreen = function ({ navigation }) {

    const [data, setData] = useState({
       firstName: '',
       lastName: '',
       userName: '',
       email: '',
       gender: '',
       phone: '',
       address: '',
       password: '',
       confirmPassword: ''
    })

    const handleSignUp = () => {
        if(data.password !== data.confirmPassword) {
                Alert.alert('Password Mismatch', 'Password and confirm password did not match', [
                    {text: 'Okay'}
                ])
            }

        if(data.firstName.length === 0 && data.lastName.length === 0 && data.userName.length === 0 
            && data.email.length === 0 && data.gender.length === 0 && data.phone.length === 0 && data.address.length === 0
            && data.password.length === 0) {
                Alert.alert('Missing field', 'You have some missing fields to fill', [
                    {text: 'Okay'}
                ])
            }
        // Handle Sign up here
        // console.log('Task created:', { firstName, lastName });

        axios.post(`${URL}/register`, {
            firstname: data.firstName,
            lastname: data.lastName,
            username: data.userName,
            email: data.email,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
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
            <ScrollView
                ScrollView showsVerticalScrollIndicator={false}
                style={{ ...styles.container, paddingTop: 130, paddingHorizontal: 35, }}
            >
                <Text style={styles.signInText}>Create your Account</Text>

                <View style={{ marginBottom: 150 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={data.firstName}
                        onChangeText={(val) => setData({...data, firstName: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={data.lastName}
                        onChangeText={(val) => setData({...data, lastName: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={data.userName}
                        onChangeText={(val) => setData({...data, userName: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={data.email}
                        onChangeText={(val) => setData({...data, email: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Gender"
                        value={data.gender}
                        onChangeText={(val) => setData({...data, gender: val})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={data.address}
                        onChangeText={(val) => setData({...data, address: val})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={data.phone}
                        onChangeText={(val) => setData({...data, phone: val})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={data.password}
                        onChangeText={(val) => setData({...data, password: val})}
                    />
                     <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={data.confirmPassword}
                        onChangeText={(val) => setData({...data, confirmPassword: val})}
                    />

                    <TouchableOpacity style={styles.addButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#094FAF', // Background color
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"

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
        // marginBottom: 20,
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

export default SignUpScreen;

