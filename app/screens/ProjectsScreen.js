// src/screens/ProjectsScreen.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BoardScreen from '../../app/screens/project/BoardScreen';
import BacklogScreen from '../../app/screens/project/BacklogScreen';
import TimelineScreen from '../../app/screens/project/TimelineScreen';
import ReportsScreen from '../../app/screens/project/ReportsScreen';
import SettingsScreen from '../../app/screens/project/SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const ProjectsScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
        
                    if (route.name === 'Board') {
                        iconName = 'dashboard';
                    } else if (route.name === 'Backlog') {
                        iconName = 'list';
                    } else if (route.name === 'Timeline') {
                        iconName = 'timeline';
                    } else if (route.name === 'Reports') {
                        iconName = 'bar-chart';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }
        
                    return <MaterialIcons name={iconName} size={20} color={color} />;
                },
                tabBarShowIcon: true,
                tabBarLabelStyle: { fontSize: 12 },
                tabBarItemStyle: { flexDirection: 'row' },
                tabBarScrollEnabled: true,
                tabBarActiveTintColor: '#227cdd',
                tabBarIndicatorStyle: { backgroundColor: '#227cdd' },
            })}
        >
            <Tab.Screen name="Board" component={BoardScreen} />
            <Tab.Screen name="Backlog" component={BacklogScreen} />
            <Tab.Screen name="Timeline" component={TimelineScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default ProjectsScreen;
