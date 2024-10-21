import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { login } from '../../api/api'; // Import the login function
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const { setUser } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userData = await login(username, password);
            setUser(userData); // Store user data in context or state
            console.log("THIS IS THE FUCKING USER DATA@!&*#NDSBAHUB!*@: " + JSON.stringify(userData));
            await AsyncStorage.setItem('jwt', userData.jwt); // Store JWT token
            navigation.navigate('Dashboard'); // Navigate to the dashboard screen
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', 'Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
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
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default LoginScreen;
