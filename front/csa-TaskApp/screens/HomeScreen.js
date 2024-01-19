import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const tasks = [
    {
        title: 'Ul Development 1',
        status: 'Completed',
        description: 'I will be creating the UI for my CS Academy Project.',
        startDate: '1 Nov 2023',
        endDate: '7 Nov 2023',
    },
    {
        title: 'Ul Development 2',
        status: 'On-going',
        description: 'I will be creating the UI for my CS Academy Project.',
        startDate: '1 Nov 2023',
        endDate: '7 Nov 2023',
    },
    {
        title: 'Ul Development 3',
        status: 'On-going',
        description: 'I will be creating the UI for my CS Academy Project.',
        startDate: '1 Nov 2023',
        endDate: '7 Nov 2023',
    },
    // Add more tasks as needed
];

const HomeScreen = ({ navigation }) => {
    const [optionsVisible, setOptionsVisible] = useState(null);

    const toggleOptions = (index) => {
        setOptionsVisible((optionsVisible) => (optionsVisible === index ? null : index));
    };

    const renderOptions = (index) => {
        if (optionsVisible === index) {
            return (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.optionButton}>
                        <Text style={styles.optionText}>Edit Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.optionButton, }}>
                        <Text style={styles.optionText}>Delete Task</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Hi Israel</Text>
                    <Text style={styles.subHeaderText}>Have a nice day!</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddTask')}
                >
                    <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.taskSummary}>
                <Text style={styles.boldText}>My Tasks</Text>
                <Text style={styles.taskCount}>05</Text>
            </View>

            < ScrollView showsVerticalScrollIndicator={false}>
                {tasks.map((task, index) => (
                    <>
                        <View
                            key={index} // Ensure each child has a unique key
                            style={[
                                styles.taskItem,
                                index === tasks.length - 1 && styles.lastChildPadding, // Apply padding to the last child
                            ]}
                        >
                            <View style={styles.taskHeaderText}>
                                <Text style={styles.title}>{task.title}</Text>
                                <Text style={styles.status}>{task.status}</Text>
                            </View>
                            <Text style={styles.description}>{task.description}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.date}> {task.startDate}-  {task.endDate} </Text>

                                <TouchableOpacity
                                    style={styles.iconBox}
                                    onPress={() => toggleOptions(index)}>
                                    <SimpleLineIcons name="options-vertical" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            {renderOptions(index)}
                        </View >
                    </>
                ))}
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30
    },
    header: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center"
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#094FAF',
        padding: 10,  // All sides are 10
        paddingHorizontal: 20,  // Left and right are 20
        borderRadius: 15,
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
    },
    taskSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        justifyContent: "space-between"
    },
    boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    taskCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F23E3E',
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 10
    },
    taskItem: {
        padding: 15,
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,

        position: 'relative',
        zIndex: 1
    },
    lastChildPadding: {
        marginBottom: 40
    },
    taskHeaderText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    status: {
        fontSize: 16,
        color: '#094FAF'
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginTop: 14
    },
    iconBox: {
        alignSelf: "flex-end",
        marginBottom: 50,
    },

    // Option Style
    optionsContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '70%',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 110,
        right: 20
    },
    optionButton: {
        padding: 10,
        marginTop: 5,
        borderBottomWidth: 2,
        borderBlockColor: '#eee8'
    },
    optionText: {
        // color: 'white',
    },
});

export default HomeScreen;