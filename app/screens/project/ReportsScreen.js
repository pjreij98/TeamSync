// src/screens/ReportsScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../../../api/api';
import { AppContext } from '@/contexts/AppContext';

const ReportsScreen = () => {
    const { user, jwt } = useContext(AppContext);
    const [sprintReports, setSprintReports] = useState([]);
    const [cumulativeFlow, setCumulativeFlow] = useState({});

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const sprintResponse = await api.get(`/reports/sprint/${user.projectId}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setSprintReports(sprintResponse.data);

                const flowResponse = await api.get(`/reports/cumulative-flow/${user.projectId}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setCumulativeFlow(flowResponse.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const renderSprintReport = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Completed Tasks: {item.completedTasks}</Text>
            <Text>Total Tasks: {item.totalTasks}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sprint Reports</Text>
            <FlatList
                data={sprintReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSprintReport}
                ListEmptyComponent={<Text>No sprint reports available.</Text>}
            />

            <Text style={styles.title}>Cumulative Flow</Text>
            <Text>Total Tasks: {cumulativeFlow.totalTasks}</Text>
            <Text>Completed Tasks: {cumulativeFlow.completedTasks}</Text>
            <Text>In Progress Tasks: {cumulativeFlow.inProgressTasks}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default ReportsScreen;
