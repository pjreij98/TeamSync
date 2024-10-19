// src/socket.js

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import store from '../store/store'; // Import the Redux store
import { addTask, updateTask, removeTask } from '../store/actions/taskActions'; // Import action creators

const SOCKET_URL = 'http://localhost:8080/ws'; // Replace with your backend WebSocket URL

const stompClient = new Client({
    brokerURL: null, // Disable brokerURL since we're using a custom webSocketFactory
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000, // Attempt to reconnect after 5 seconds if disconnected
    debug: (str) => {
        console.log(str);
    },
    onConnect: () => {
        console.log('Connected to WebSocket');

        // Subscribe to Task Updates
        stompClient.subscribe('/topic/task-updates', (message) => {
            const task = JSON.parse(message.body);
            console.log('Task update received:', task);
            store.dispatch(updateTask(task));
        });

        // Subscribe to New Tasks
        stompClient.subscribe('/topic/new-task', (message) => {
            const task = JSON.parse(message.body);
            console.log('New task received:', task);
            store.dispatch(addTask(task));
        });

        // Subscribe to Task Deletions
        stompClient.subscribe('/topic/task-deleted', (message) => {
            const taskId = JSON.parse(message.body);
            console.log('Task deleted:', taskId);
            store.dispatch(removeTask(taskId));
        });
    },
    onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    },
    onWebSocketClose: () => {
        console.log('WebSocket connection closed');
    },
});

export const connect = () => {
    if (stompClient.active) {
        console.log('STOMP client is already active');
        return;
    }
    stompClient.activate();
};

export const disconnect = () => {
    if (!stompClient.active) {
        console.log('STOMP client is not active');
        return;
    }
    stompClient.deactivate();
};

export default stompClient;
