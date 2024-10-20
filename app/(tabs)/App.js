import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Dashboard from '../screens/Dashboard';
import TaskBoard from '../screens/TaskBoard';
import LoginScreen from '../screens/LoginScreen';
import { AppProvider, AppContext } from '../../contexts/AppContext';
import { connect, disconnect } from '../../api/socket';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function AppNavigator() {
    const { user } = useContext(AppContext); // Access the user from context

    useEffect(() => {
        if (user) {
            connect();
        } else {
            disconnect();
        }

        return () => {
            disconnect();
        };
    }, [user]);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
                {user ? (
                    <>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
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

export default function App() {
    return (
        <Provider store={store}>
            <AppProvider>
                <PaperProvider>
                    {/* NavigationContainer should be provided only once, possibly by Expo */}
                    <AppNavigator />
                </PaperProvider>
            </AppProvider>
        </Provider>
    );
}
