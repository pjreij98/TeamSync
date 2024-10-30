// src/App.js

import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from '../../navigation/MainNavigator';
import ProjectSelectionScreen from '../screens/ProjectSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import TaskBoard from '../screens/TaskBoard';
import { AppProvider, AppContext } from '../../contexts/AppContext';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

function AppNavigator() {
    const { user, activeProject, isLoading } = useContext(AppContext);

    if (isLoading) {
        // Show loading indicator or splash screen
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#227cdd" />
            </View>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    activeProject ? (
                        <>
                            <Stack.Screen name="Main" component={MainNavigator} />
                            <Stack.Screen name="TaskBoard" component={TaskBoard} />
                            {/* Other screens */}
                        </>
                    ) : (
                        <Stack.Screen name="SelectProject" component={ProjectSelectionScreen} />
                    )
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        {/* Other auth screens */}
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    useEffect(() => {
        // Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();
    }, []);

    return (
        <AppProvider>
            <PaperProvider>
                <AppNavigator />
            </PaperProvider>
        </AppProvider>
    );
}
