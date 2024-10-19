// src/store/reducers/taskReducer.js

import { ADD_TASK, UPDATE_TASK, REMOVE_TASK } from '../actions/taskActions';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        default:
            return state;
    }
};

export default taskReducer;
