// src/navigation/MainNavigator.js
import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../app/screens/HomeScreen';
import ProjectsScreen from '../app/screens/ProjectsScreen';
import IssuesScreen from '../app/screens/IssuesScreen';
import DashboardScreen from '../app/screens/Dashboard';
import NotificationsScreen from '../app/screens/NotificationsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@/contexts/AppContext';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const { user, activeProject } = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        if (!user) {
            navigation.replace('Login');
        } else if (!activeProject) {
            navigation.replace('SelectProject');
        }
    }, [user, activeProject]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Projects') {
                        iconName = 'folder';
                    } else if (route.name === 'Issues') {
                        iconName = 'assignment';
                    } else if (route.name === 'Dashboards') {
                        iconName = 'dashboard';
                    } else if (route.name === 'Notifications') {
                        iconName = 'notifications';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#227cdd',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Projects" component={ProjectsScreen} />
            <Tab.Screen name="Issues" component={IssuesScreen} />
            <Tab.Screen name="Dashboards" component={DashboardScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
        </Tab.Navigator>
    );
}
