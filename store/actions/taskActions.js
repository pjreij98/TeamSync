// src/store/actions/taskActions.js
import axios from 'axios';

// Existing action types and creators...

// Action Types
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

// Action Creators
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task,
});

export const removeTask = (taskId) => ({
    type: REMOVE_TASK,
    payload: taskId,
});

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
});

// Thunk Action to Fetch Tasks
export const fetchTasks = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('jwt'); // Or retrieve from your auth context
            const response = await axios.get('http://localhost:8080/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(fetchTasksSuccess(response.data));
        } catch (error) {
            dispatch(fetchTasksFailure(error.response.data));
        }
    };
};