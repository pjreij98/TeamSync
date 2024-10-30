import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../contexts/AppContext'; 
import api from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectSelectionScreen = ({ navigation }) => {
    const { user, projects, loadingProjects, setActiveProject, jwt } = useContext(AppContext); // Access JWT from context

    const handleSelectProject = async (projectId) => {
        try {
            // Set active project in backend and context
            await api.put(`/users/${user.id}/active-project/${projectId}`, {}, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
    
            setActiveProject(projectId);
            await AsyncStorage.setItem('activeProjectId', projectId.toString());
    
            navigation.replace('Main');
        } catch (error) {
            console.error('Error setting active project:', error);
        }
    };
    

    const renderProjectItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectProject(item.id)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    if (loadingProjects) {
        return (
            <View style={styles.container}>
                <Text>Loading projects...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Project</Text>
            <FlatList
                data={projects}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProjectItem}
                ListEmptyComponent={<Text>No projects available.</Text>}
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
        marginBottom: 20,
    },
    item: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default ProjectSelectionScreen;
