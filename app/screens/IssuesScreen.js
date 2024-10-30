// src/screens/IssuesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import api from '../../api/api';

const IssuesScreen = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await api.get('/issues'); // Replace with your backend endpoint
                setIssues(response.data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);

    const renderIssue = ({ item }) => (
        <View style={styles.issueItem}>
            <Text style={styles.issueTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={issues}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderIssue}
                ListEmptyComponent={<Text>No issues available.</Text>}
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
    issueItem: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    issueTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default IssuesScreen;
