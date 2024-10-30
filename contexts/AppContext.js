// src/contexts/AppContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';  
import api from '../api/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [activeProject, setActiveProject] = useState(null);
    const [projects, setProjects] = useState([]);

    // Utility to validate JWT token
    const validateJwt = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            return decodedToken.exp > currentTime; // Check if the token is still valid
        } catch (error) {
            return false; // If there's an error in decoding, return false
        }
    };

    // Load user data from AsyncStorage on app startup
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedJwt = await AsyncStorage.getItem('jwt');
                const storedUser = await AsyncStorage.getItem('user');
                const storedActiveProject = await AsyncStorage.getItem('activeProjectId');

                if (storedJwt && storedUser && validateJwt(storedJwt)) {
                    setJwt(storedJwt);
                    const userObj = JSON.parse(storedUser);
                    setUser(userObj);

                    if (storedActiveProject) {
                        setActiveProject(parseInt(storedActiveProject, 10));
                    }

                    // Fetch projects
                    await fetchProjectsForUser(storedJwt, userObj);
                } else {
                    // If no valid token or user data found, clear storage
                    await AsyncStorage.removeItem('jwt');
                    await AsyncStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false); // Loading is done
            }
        };

        loadUserData();
    }, []);

    // Fetch user projects and store them in context
    const fetchProjectsForUser = async (tokenParam = null, userParam = null) => {
        try {
            let token = tokenParam || jwt;
            let currentUser = userParam || user;

            if (!token || !currentUser) {
                return; // Exit if no valid token or user
            }

            // Fetch projects
            const response = await api.get(`/users/${currentUser.id}/projects`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Projects fetched: ", response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching user projects:', error);
        }
    };

    return (
        <AppContext.Provider value={{ 
            user, 
            setUser, 
            jwt, 
            setJwt, 
            isLoading,
            activeProject,
            setActiveProject,
            projects,
            fetchProjectsForUser,
            // ... other context values ...
        }}>
            {children}
        </AppContext.Provider>
    );
};
