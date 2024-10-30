// src/screens/TimelineScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../../api/api';
import { AppContext } from '@/contexts/AppContext';

const TimelineScreen = () => {
    const { user, jwt } = useContext(AppContext);
    const [epics, setEpics] = useState([]);
    const [newEpicTitle, setNewEpicTitle] = useState('');
    const [newEpicDescription, setNewEpicDescription] = useState('');

    const fetchEpics = async () => {
        try {
            const response = await api.get(`/epics/project/${user.projectId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setEpics(response.data);
        } catch (error) {
            console.error('Error fetching epics:', error);
        }
    };
    
    useEffect(() => {
        fetchEpics();
    }, []);

    const handleAddEpic = async () => {
        try {
            await api.post(`/epics`, {
                title: newEpicTitle,
                projectId: user.projectId,
            }, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setNewEpicTitle('');
            await fetchEpics(); // Refresh the list
        } catch (error) {
            console.error('Error adding epic:', error);
        }
    };

    const renderEpicItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timeline</Text>
            <FlatList
                data={epics}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEpicItem}
                ListEmptyComponent={<Text>No epics available.</Text>}
            />
            <TextInput
                style={styles.input}
                placeholder="New Epic Title"
                value={newEpicTitle}
                onChangeText={setNewEpicTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="New Epic Description"
                value={newEpicDescription}
                onChangeText={setNewEpicDescription}
            />
            <Button title="Add Epic" onPress={handleAddEpic} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default TimelineScreen;
