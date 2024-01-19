// AddTaskScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { RadioButton } from 'react-native-paper';

const AddTaskScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('None');


    const handleCreateTask = () => {
        // Handle creating the task here
        console.log('Task created:', { title, description, startDate, endDate, priority });
    };

    return (
        <ScrollView style={styles.container} ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 40 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />

                <TextInput
                    style={{ ...styles.input, height: 80, }}
                    placeholder="Task Description"
                    multiline
                    numberOfLines={4}

                    value={description}
                    onChangeText={(text) => setDescription(text)}

                />

                <Text style={styles.DateStyle}>Choose Start Date</Text>
                <DatePicker
                    mode="calendar"
                    onSelectedChange={date => setStartDate(date)}
                />

                <Text style={styles.DateStyle}>Choose End Date</Text>
                <DatePicker
                    mode="calendar"
                    onSelectedChange={date => setEndDate(date)}
                />

                <View style={styles.radioGroup}>
                    <Text>Priority:</Text>
                    <RadioButton.Group onValueChange={(value) => setPriority(value)} value={priority}>
                        <View style={styles.radioItem}>
                            <RadioButton value="None" />
                            <Text>None</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="High" />
                            <Text>High</Text>
                        </View>
                    </RadioButton.Group>
                </View>

                <TouchableOpacity style={styles.addButton}
                    onPress={() => handleCreateTask()}
                >
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        paddingTopTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        paddingHorizontal: 10,
        backgroundColor: "#eee",
        borderRadius: 5,
        gap: 25,
    },
    DateStyle: {
        backgroundColor: "#eee",
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },

    addButton: {
        backgroundColor: '#094FAF',
        padding: 13,  // All sides are 10
        paddingHorizontal: 20,  // Left and right are 20
        borderRadius: 15,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    button: {
        borderRadius: 10, // Set the border radius
        borderWidth: 2, // Set the border width
        borderColor: '#3498db', // Set the border color to blue
        padding: 10, // Add some padding for better visual appearance
    },
});

export default AddTaskScreen;
