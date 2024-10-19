// src/screens/TaskBoard.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { connect, disconnect } from '../api/socket';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTasks } from '../store/actions/taskActions';
import Modal from 'react-native-modal';

const TaskBoard = () => {
    const tasks = useSelector((state) => state.taskState.tasks);
    const dispatch = useDispatch();

    const [isModalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        // Connect to WebSocket when component mounts
        connect();

        // Fetch initial tasks from backend
        dispatch(fetchTasks());

        // Disconnect from WebSocket when component unmounts
        return () => {
            disconnect();
        };
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) {
            Alert.alert('Validation Error', 'Task title cannot be empty.');
            return;
        }

        dispatch(addTask({ title: newTaskTitle, status: 'PENDING' }));
        setNewTaskTitle('');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Board</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No tasks available.</Text>}
            />
            <Button title="Add Task" onPress={() => setModalVisible(true)} />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Task</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Task Title"
                        value={newTaskTitle}
                        onChangeText={setNewTaskTitle}
                    />
                    <Button title="Add" onPress={handleAddTask} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    taskItem: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default TaskBoard;
