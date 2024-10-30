// src/screens/SettingsScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native';
import api from '../../../api/api';
import { AppContext } from '@/contexts/AppContext';

const SettingsScreen = () => {
    const [projectName, setProjectName] = useState('');
    const [projectKey, setProjectKey] = useState('');
    const [description, setDescription] = useState('');
    const [isFeatureEnabled, setFeatureEnabled] = useState(true);

    const { user, projects, setActiveProject, jwt } = useContext(AppContext);

    const handleSelectProject = async (projectId) => {
        try {
            await api.put(`/users/${user.id}/active-project/${projectId}`, {}, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setActiveProject(projectId);
            await AsyncStorage.setItem('activeProjectId', projectId.toString()); // Save active project ID in AsyncStorage
            navigation.navigate('Dashboard'); // Navigate to the Dashboard or main screen
        } catch (error) {
            console.error('Error setting active project:', error);
        }
    };


    const renderProjectItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectProject(item.id)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );


    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await api.get(`/projects/${user.projectId}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                const project = response.data;
                setProjectName(project.name);
                setProjectKey(project.projectKey);
                setDescription(project.description);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, []);

    const handleSave = async () => {
        try {
            await api.put(`/projects/${user.projectId}`, {
                name: projectName,
                projectKey,
                description,
            }, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            alert('Project details updated successfully');
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Select a Project</Text>
                <FlatList
                    data={projects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProjectItem}
                    ListEmptyComponent={<Text>No projects available.</Text>}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Project Settings</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Project Name"
                    value={projectName}
                    onChangeText={setProjectName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Project Key"
                    value={projectKey}
                    onChangeText={setProjectKey}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.label}>Enable AI Scrum Assistant:</Text>
                <Switch
                    value={isFeatureEnabled}
                    onValueChange={(value) => setFeatureEnabled(value)}
                />
                <Button title="Save" onPress={handleSave} />
            </View>
        </>
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
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default SettingsScreen;
