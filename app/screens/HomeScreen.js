import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AppContext } from '../../contexts/AppContext';

const HomeScreen = ({ navigation }) => {
    const { user } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user.username}!</Text>
            <Button
                title="Go to Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff', // AliceBlue background
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 30,
    },
});

export default HomeScreen;
