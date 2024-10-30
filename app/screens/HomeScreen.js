// src/screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { AppContext } from '../../contexts/AppContext';

const HomeScreen = () => {
    const { user } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');

    const recentItems = [
        { id: '1', title: 'Example Project Name', type: 'Project' },
        { id: '2', title: 'Develop Example Story', type: 'Story' },
        { id: '3', title: 'Bug Report: Fix Navbar', type: 'Bug' },
    ];

    const renderRecentItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemType}>{item.type}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello, {user.username}!</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search for projects, boards, assignments..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <Text style={styles.sectionTitle}>Recent Items</Text>
            <FlatList
                data={recentItems}
                keyExtractor={(item) => item.id}
                renderItem={renderRecentItem}
            />

            <Text style={styles.sectionTitle}>My Open Issues</Text>
            <FlatList
                data={recentItems} // Reusing recentItems as an example, replace with issues from backend
                keyExtractor={(item) => item.id}
                renderItem={renderRecentItem}
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
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemType: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;
