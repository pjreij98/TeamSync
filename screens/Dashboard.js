import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Dashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Button
                title="View Task Board"
                onPress={() => navigation.navigate('TaskBoard')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Dashboard;
