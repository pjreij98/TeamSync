// src/screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import api from '../../api/api';

const DashboardScreen = () => {
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [activityStream, setActivityStream] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const tasksResponse = await api.get('/tasks/assigned'); // Replace with your backend endpoint
                setAssignedTasks(tasksResponse.data);

                const activityResponse = await api.get('/activity'); // Replace with your backend endpoint
                setActivityStream(activityResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assigned to Me</Text>
            <FlatList
                data={assignedTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No tasks assigned to you.</Text>}
            />

            <Text style={styles.title}>Activity Stream</Text>
            <FlatList
                data={activityStream}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.activityItem}>
                        <Text>{item.message}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No recent activity.</Text>}
            />
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
        marginBottom: 10,
    },
    taskItem: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    activityItem: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default DashboardScreen;
