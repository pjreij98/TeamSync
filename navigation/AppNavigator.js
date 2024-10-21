import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/screens/HomeScreen';
import Dashboard from '../app/screens/Dashboard';
import TaskBoard from '../app/screens/TaskBoard';
import LoginScreen from '../app/screens/LoginScreen';
import { AppProvider, AppContext } from '../contexts/AppContext';
import { connect, disconnect } from '../api/socket';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '../store/store';

const Stack = createStackNavigator();

function AppNavigator() {
    const { user } = useContext(AppContext); // Access the user from context

    useEffect(() => {
        // if (user) {
        //     connect();
        // } else {
        //     disconnect();
        // }

        // return () => {
        //     disconnect();
        // };
    }, [user]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="TaskBoard" component={TaskBoard} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
