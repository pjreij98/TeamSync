// src/screens/projects/BacklogScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../../../api/api';
import { AppContext } from '@/contexts/AppContext';

const BacklogScreen = () => {
    const { user, jwt } = useContext(AppContext);
    const [backlog, setBacklog] = useState([]);
    const [sprints, setSprints] = useState([]);

    useEffect(() => {
        const fetchBacklogAndSprints = async () => {
            try {
                const response = await api.get(`/tasks/backlog/${user.projectId}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setBacklog(response.data.backlog);
                setSprints(response.data.sprints);
            } catch (error) {
                console.error('Error fetching backlog and sprints:', error);
            }
        };

        fetchBacklogAndSprints();
    }, []);

    const renderBacklogItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    const renderSprintItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <FlatList
                data={item.tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderBacklogItem}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Backlog</Text>
            <FlatList
                data={backlog}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBacklogItem}
                ListEmptyComponent={<Text>No backlog items available.</Text>}
            />

            <Text style={styles.title}>Sprints</Text>
            <FlatList
                data={sprints}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSprintItem}
                ListEmptyComponent={<Text>No sprints available.</Text>}
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

export default BacklogScreen;
