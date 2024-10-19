import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TaskBoardScreen from '../screens/TaskBoardScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Authentication Screens */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />

                {/* Main App Screens */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="TaskBoard" component={TaskBoardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
