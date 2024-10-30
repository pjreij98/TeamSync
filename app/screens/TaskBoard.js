import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import stompClient, { connect, disconnect } from '../../api/socket';
import api from '../../api/api'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/contexts/AppContext';

const TaskBoard = () => {
    const { user, jwt } = useContext(AppContext);
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', { headers: {
                Authorization: token ? `Bearer ${jwt}` : ''
            }}); // Replace with your backend API
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    // Fetch initial tasks from the backend when the component mounts
    useEffect(() => {
        fetchTasks();

        // Connect to WebSocket
        // connect();

        // Handle WebSocket events (new tasks, updates, deletions)
        // const handleTaskUpdates = (message) => {
        //     const updatedTask = JSON.parse(message.body);
        //     setTasks((prevTasks) =>
        //         prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        //     );
        // };

        // const handleNewTask = (message) => {
        //     const newTask = JSON.parse(message.body);
        //     setTasks((prevTasks) => [...prevTasks, newTask]);
        // };

        // const handleTaskDeletion = (message) => {
        //     const taskId = JSON.parse(message.body);
        //     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        // };

        // Subscribe to the relevant WebSocket topics
        // const subscriptions = [
        //     stompClient.subscribe('/topic/task-updates', handleTaskUpdates),
        //     stompClient.subscribe('/topic/new-task', handleNewTask),
        //     stompClient.subscribe('/topic/task-deleted', handleTaskDeletion),
        // ];

        // Cleanup WebSocket subscriptions when the component unmounts
        // return () => {
        //     subscriptions.forEach((subscription) => subscription.unsubscribe());
        //     disconnect();
        // };
    }, []);

    // Handle adding new task
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) {
            Alert.alert('Validation Error', 'Task title cannot be empty.');
            return;
        }

        try {
            // console.log(user)
            const deadline = new Date("2025-02-15T23:59:59").toISOString();
            // await fetch("http://192.168.1.78:8080/api/tasks", {
            //     body: JSON.stringify({ 
            //         title: newTaskTitle, 
            //         description: 'SAMPLE desc',
            //         status: 'PENDING', 
            //         priority: "MEDIUM",
            //         deadline
            //     }),
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${jwt}` 
            //     }
            // })
            const task = {
                title: newTaskTitle, 
                status: 'PENDING', 
                description: 'SAMPLE desc',
                priority: "MEDIUM",
                deadline: "2025-02-15T23:59:59"
            }
            console.log(task)
            await api.post('/tasks', task, {
                headers: {
                    Authorization: `Bearer ${jwt}` 
                }
            });
            setNewTaskTitle('');
            setModalVisible(false);
            // New task will be received via WebSocket event
        } catch (error) {
            console.error('Error adding task:', error);
            Alert.alert('Error', 'Failed to add task.', error);
        }
        fetchTasks();
    };

    // Render each task
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
        </TouchableOpacity>
    );

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
