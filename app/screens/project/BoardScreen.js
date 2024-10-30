// src/screens/projects/BoardScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../../../api/api'; // Assuming you're using axios for API calls
import { AppContext } from '@/contexts/AppContext';

const BoardScreen = () => {
    const { activeProject, jwt } = useContext(AppContext);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        const fetchBoardTasks = async () => {
            console.log("JWT: " + jwt + "\n projectId: " + activeProject);
            try {
                const response = await api.get(`/tasks/board/${activeProject}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                console.log(response.data)
                setToDoTasks(response.data.toDo);
                setInProgressTasks(response.data.inProgress);
                setDoneTasks(response.data.done);
                console.log("TO DO TASKS: " + toDoTasks);
                console.log("IN PROGRESS TASKS" + inProgressTasks);
                console.log("DONE TASKS: " + doneTasks);
            } catch (error) {
                console.error('Error fetching board tasks:', error);
            }
        };

        fetchBoardTasks();
    }, []);

    const renderTaskItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To Do</Text>
            <FlatList
                data={toDoTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaskItem}
                ListEmptyComponent={<Text>No tasks in To Do.</Text>}
            />

            <Text style={styles.title}>In Progress</Text>
            <FlatList
                data={inProgressTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaskItem}
                ListEmptyComponent={<Text>No tasks in progress.</Text>}
            />

            <Text style={styles.title}>Done</Text>
            <FlatList
                data={doneTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaskItem}
                ListEmptyComponent={<Text>No tasks completed.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default BoardScreen;