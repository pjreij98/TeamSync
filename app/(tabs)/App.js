import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import Dashboard from '../../screens/Dashboard';
import TaskBoard from '../../screens/TaskBoard';
import LoginScreen from '../../screens/LoginScreen';
import { AppProvider, AppContext } from '../../contexts/AppContext';
import { connect, disconnect } from '../../api/socket';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '../../store/store'

const Stack = createStackNavigator();

export default function App() {
    const { user } = useContext(AppContext);

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
        <Provider store={store}>
            <AppProvider>
                <PaperProvider>
                    <NavigationContainer independent={true}>
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
                </PaperProvider>
            </AppProvider>
        </Provider>
    );
}
